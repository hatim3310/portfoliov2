import os
import sys
import time
import threading
import http.server
import socketserver
from playwright.sync_api import sync_playwright

PORT = 8766
DIRECTORY = r"c:\Users\LEGION\Desktop\portfoliov2"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def log_message(self, format, *args):
        pass

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        httpd.serve_forever()

def run_suite():
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(0.5)

    base_url = f"http://127.0.0.1:{PORT}/index.html"

    report = {
        "viewport_responsiveness": {},
        "splittext_and_manifesto": {},
        "mobile_menu": {},
        "modal_focus": {},
        "console_and_network_errors": []
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Test viewports: 360px, 375px, 768px, 1024px, 1440px
        viewports = [360, 375, 768, 1024, 1440]
        
        for vp_w in viewports:
            context = browser.new_context(viewport={"width": vp_w, "height": 800})
            page = context.new_page()

            page.goto(f"{base_url}?noloader=true")
            page.wait_for_load_state("networkidle")
            time.sleep(0.5)

            scroll_w = page.evaluate("document.documentElement.scrollWidth")
            client_w = page.evaluate("document.documentElement.clientWidth")
            overflow = scroll_w - vp_w

            report["viewport_responsiveness"][f"{vp_w}px"] = {
                "clientWidth": client_w,
                "scrollWidth": scroll_w,
                "overflow_px": overflow,
                "pass": overflow <= 0
            }
            context.close()

        # Detailed test session on 360px for interaction testing
        context = browser.new_context(viewport={"width": 360, "height": 800})
        page = context.new_page()

        console_logs = []
        network_errors = []

        page.on("console", lambda msg: console_logs.append({
            "type": msg.type,
            "text": msg.text,
            "location": msg.location
        }))

        page.on("requestfailed", lambda req: network_errors.append({
            "url": req.url,
            "failure": req.failure
        }))

        page.goto(base_url)
        page.wait_for_load_state("networkidle")
        time.sleep(1.5) # Allow loader to complete

        # Check Loader completion
        loader_visible = page.evaluate("""() => {
            const l = document.getElementById('loader-overlay');
            return l ? window.getComputedStyle(l).display !== 'none' : false;
        }""")

        # Check SplitText and Manifesto
        splittext_check = page.evaluate("""() => {
            const script = document.querySelector('script[src*="SplitText"]');
            const manifesto = document.querySelector('.manifesto-text');
            const chars = manifesto ? manifesto.querySelectorAll('.char') : [];
            const revealed = manifesto ? manifesto.querySelectorAll('.char.revealed') : [];
            return {
                scriptSrc: script ? script.src : null,
                hasScriptTag: !!script,
                splitTextDefined: typeof SplitText !== 'undefined',
                charCount: chars.length,
                revealedCount: revealed.length
            };
        }""")

        report["splittext_and_manifesto"] = splittext_check

        # Scroll down to Manifesto to test character reveal styling
        page.evaluate("document.querySelector('#manifesto').scrollIntoView({behavior: 'instant'})")
        time.sleep(0.5)

        manifesto_scrolled_check = page.evaluate("""() => {
            const manifesto = document.querySelector('.manifesto-text');
            const chars = manifesto ? manifesto.querySelectorAll('.char') : [];
            const sampleStyles = Array.from(chars).slice(0, 5).map(c => ({
                text: c.textContent,
                color: window.getComputedStyle(c).color,
                opacity: window.getComputedStyle(c).opacity
            }));
            return {
                charCount: chars.length,
                sampleStyles
            };
        }""")

        report["splittext_and_manifesto"]["scrolled_check"] = manifesto_scrolled_check

        # Test Mobile Menu
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.3)

        # 1. Click toggle to open
        page.click(".mobile-nav-toggle")
        time.sleep(0.3)
        menu_open = page.evaluate("""() => {
            const menu = document.querySelector('.nav-menu');
            const toggle = document.querySelector('.mobile-nav-toggle');
            return {
                menuActive: menu.classList.contains('active'),
                toggleActive: toggle.classList.contains('active'),
                ariaExpanded: toggle.getAttribute('aria-expanded'),
                rightPos: window.getComputedStyle(menu).right
            };
        }""")

        # 2. Press Escape to close
        page.keyboard.press("Escape")
        time.sleep(0.3)
        menu_esc_close = page.evaluate("""() => {
            const menu = document.querySelector('.nav-menu');
            const toggle = document.querySelector('.mobile-nav-toggle');
            return {
                menuActive: menu.classList.contains('active'),
                ariaExpanded: toggle.getAttribute('aria-expanded')
            };
        }""")

        # 3. Open and click nav link to close
        page.click(".mobile-nav-toggle")
        time.sleep(0.3)
        page.click(".nav-menu .nav-link[href='#works']")
        time.sleep(0.3)
        menu_link_close = page.evaluate("""() => {
            const menu = document.querySelector('.nav-menu');
            const toggle = document.querySelector('.mobile-nav-toggle');
            return {
                menuActive: menu.classList.contains('active'),
                ariaExpanded: toggle.getAttribute('aria-expanded')
            };
        }""")

        report["mobile_menu"] = {
            "open": menu_open,
            "close_esc": menu_esc_close,
            "close_link": menu_link_close,
            "pass": menu_open["menuActive"] and not menu_esc_close["menuActive"] and not menu_link_close["menuActive"]
        }

        # Test Modal Keyboard Focus Trapping & Restoration (#project-modal)
        page.evaluate("document.querySelector('#works').scrollIntoView({behavior: 'instant'})")
        time.sleep(0.5)

        # Focus project card 2 (f1-velocity)
        card_2 = page.locator('.bento-card[data-project-id="f1-velocity"]')
        card_2.focus()

        focused_before = page.evaluate("document.activeElement.getAttribute('data-project-id')")

        # Press Space key to open modal
        page.keyboard.press("Space")
        time.sleep(0.5)

        modal_open_check = page.evaluate("""() => {
            const modal = document.getElementById('project-modal');
            const active = document.activeElement;
            const title = document.getElementById('modal-title').textContent;
            return {
                modalActive: modal.classList.contains('active'),
                activeInsideModal: modal.contains(active),
                activeTag: active.tagName,
                activeClass: active.className,
                title
            };
        }""")

        # Test forward tab focus trap (5 tabs)
        forward_tabs = []
        for i in range(5):
            page.keyboard.press("Tab")
            time.sleep(0.05)
            forward_tabs.append(page.evaluate("""() => ({
                tag: document.activeElement.tagName,
                class: document.activeElement.className,
                insideModal: document.getElementById('project-modal').contains(document.activeElement)
            })"""))

        # Test backward shift+tab focus trap (5 shift+tabs)
        backward_tabs = []
        for i in range(5):
            page.keyboard.press("Shift+Tab")
            time.sleep(0.05)
            backward_tabs.append(page.evaluate("""() => ({
                tag: document.activeElement.tagName,
                class: document.activeElement.className,
                insideModal: document.getElementById('project-modal').contains(document.activeElement)
            })"""))

        # Close modal with Escape key
        page.keyboard.press("Escape")
        time.sleep(0.3)

        restored_after = page.evaluate("document.activeElement.getAttribute('data-project-id')")

        report["modal_focus"] = {
            "trigger_id": focused_before,
            "modal_open": modal_open_check,
            "forward_tabs_trapped": all(t["insideModal"] for t in forward_tabs),
            "backward_tabs_trapped": all(t["insideModal"] for t in backward_tabs),
            "restored_id": restored_after,
            "focus_restoration_pass": (focused_before == restored_after == "f1-velocity")
        }

        report["console_and_network_errors"] = {
            "console_logs": console_logs,
            "network_errors": network_errors
        }

        browser.close()

    print("\n================ DETAILED TEST REPORT ================")
    import json
    print(json.dumps(report, indent=2))
    return report

if __name__ == "__main__":
    run_suite()
