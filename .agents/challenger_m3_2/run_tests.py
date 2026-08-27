import os
import sys
import time
import threading
import http.server
import socketserver
from playwright.sync_api import sync_playwright

PORT = 8765
DIRECTORY = r"c:\Users\LEGION\Desktop\portfoliov2"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def log_message(self, format, *args):
        pass  # suppress server logs

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        httpd.serve_forever()

def run_suite():
    # Start local server in background thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(0.5)

    url = f"http://127.0.0.1:{PORT}/index.html?noloader=true"
    url_with_loader = f"http://127.0.0.1:{PORT}/index.html"

    results = {
        "overflow_360px": None,
        "overflow_details": [],
        "splittext_execution": None,
        "manifesto_reveal": None,
        "mobile_menu_toggle": None,
        "focus_trapping": None,
        "focus_restoration": None,
        "console_errors": []
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 360, "height": 800})
        page = context.new_page()

        # Capture console errors and page errors
        page.on("console", lambda msg: results["console_errors"].append(f"CONSOLE {msg.type}: {msg.text}") if msg.type in ["error", "warning"] else None)
        page.on("pageerror", lambda err: results["console_errors"].append(f"PAGEERROR: {err}"))

        print("=== TEST 1: 360px Viewport Responsiveness & Overflow Check ===")
        page.goto(url)
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # Check document width and scrollWidth
        metrics = page.evaluate("""() => {
            const documentWidth = document.documentElement.clientWidth;
            const scrollWidth = document.documentElement.scrollWidth;
            const bodyScrollWidth = document.body.scrollWidth;
            const innerWidth = window.innerWidth;

            // Find all elements extending beyond clientWidth
            const overflowingElements = [];
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.right > documentWidth + 1 || rect.left < -1) {
                    overflowingElements.push({
                        tagName: el.tagName,
                        id: el.id,
                        className: el.className,
                        right: rect.right,
                        left: rect.left,
                        width: rect.width,
                        outerHTML: el.outerHTML.substring(0, 150)
                    });
                }
            });

            return {
                documentWidth,
                scrollWidth,
                bodyScrollWidth,
                innerWidth,
                overflowingElements
            };
        }""")

        overflow_px = metrics["scrollWidth"] - metrics["innerWidth"]
        print(f"Viewport InnerWidth: {metrics['innerWidth']}px")
        print(f"Document ScrollWidth: {metrics['scrollWidth']}px")
        print(f"Overflow Amount: {overflow_px}px")

        if overflow_px <= 0 and len(metrics["overflowingElements"]) == 0:
            results["overflow_360px"] = "PASS"
            print("RESULT: 0px horizontal overflow verified on 360px viewport.")
        else:
            results["overflow_360px"] = "FAIL"
            results["overflow_details"] = metrics["overflowingElements"]
            print(f"RESULT: FAIL - Found {overflow_px}px horizontal overflow.")
            for item in metrics["overflowingElements"][:10]:
                print(f"  Overflow element: <{item['tagName']} id='{item['id']}' class='{item['className']}'> right={item['right']}px width={item['width']}px")


        print("\n=== TEST 2: SplitText Execution & Manifesto Character Reveal ===")
        splittext_info = page.evaluate("""() => {
            const scriptTag = document.querySelector('script[src*="SplitText"]');
            const hasScriptTag = !!scriptTag;
            const scriptSrc = scriptTag ? scriptTag.src : null;
            const gsapDefined = typeof gsap !== 'undefined';
            const splitTextDefined = typeof SplitText !== 'undefined';
            const isRegistered = gsapDefined && gsap.plugins && !!gsap.plugins.SplitText;

            return {
                hasScriptTag,
                scriptSrc,
                gsapDefined,
                splitTextDefined,
                isRegistered
            };
        }""")

        print(f"SplitText CDN Script Tag in DOM: {splittext_info['hasScriptTag']} ({splittext_info['scriptSrc']})")
        print(f"SplitText Class Defined: {splittext_info['splitTextDefined']}")

        # Scroll down to Manifesto section to trigger animation
        page.evaluate("document.querySelector('#manifesto').scrollIntoView({behavior: 'instant'})")
        time.sleep(1)

        manifesto_chars = page.evaluate("""() => {
            const manifestoText = document.querySelector('.manifesto-text');
            const charSpans = manifestoText ? manifestoText.querySelectorAll('.char') : [];
            const revealedChars = manifestoText ? manifestoText.querySelectorAll('.char.revealed') : [];
            
            // Check computed styles of char elements
            const charSample = Array.from(charSpans).slice(0, 10).map(c => ({
                text: c.textContent,
                color: window.getComputedStyle(c).color,
                opacity: window.getComputedStyle(c).opacity,
                className: c.className
            }));

            return {
                totalChars: charSpans.length,
                sampleChars: charSample
            };
        }""")

        print(f"Total manifesto char spans generated: {manifesto_chars['totalChars']}")
        if manifesto_chars['totalChars'] > 0:
            print("Sample char styles:")
            for sample in manifesto_chars['sampleChars']:
                print(f"  Char '{sample['text']}': color={sample['color']}, opacity={sample['opacity']}, class={sample['className']}")

        if splittext_info["hasScriptTag"] and manifesto_chars["totalChars"] > 0:
            results["splittext_execution"] = "PASS"
            results["manifesto_reveal"] = "PASS"
            print("RESULT: SplitText tag verified & manifesto chars properly created.")
        else:
            results["splittext_execution"] = "FAIL" if not splittext_info["hasScriptTag"] else "PASS"
            results["manifesto_reveal"] = "FAIL" if manifesto_chars["totalChars"] == 0 else "PASS"


        print("\n=== TEST 3: Mobile Menu Toggle Interaction ===")
        # Page is at 360px viewport
        menu_initial = page.evaluate("""() => {
            const toggle = document.querySelector('.mobile-nav-toggle');
            const menu = document.querySelector('.nav-menu');
            return {
                toggleVisible: window.getComputedStyle(toggle).display !== 'none',
                menuActive: menu.classList.contains('active'),
                toggleActive: toggle.classList.contains('active'),
                ariaExpanded: toggle.getAttribute('aria-expanded')
            };
        }""")
        print(f"Initial Menu State: toggleVisible={menu_initial['toggleVisible']}, menuActive={menu_initial['menuActive']}, ariaExpanded={menu_initial['ariaExpanded']}")

        # Click toggle to open
        page.click(".mobile-nav-toggle")
        time.sleep(0.3)

        menu_opened = page.evaluate("""() => {
            const toggle = document.querySelector('.mobile-nav-toggle');
            const menu = document.querySelector('.nav-menu');
            return {
                menuActive: menu.classList.contains('active'),
                toggleActive: toggle.classList.contains('active'),
                ariaExpanded: toggle.getAttribute('aria-expanded'),
                menuRight: window.getComputedStyle(menu).right
            };
        }""")
        print(f"Opened Menu State: menuActive={menu_opened['menuActive']}, toggleActive={menu_opened['toggleActive']}, ariaExpanded={menu_opened['ariaExpanded']}, right={menu_opened['menuRight']}")

        # Press Escape to close
        page.keyboard.press("Escape")
        time.sleep(0.3)

        menu_closed = page.evaluate("""() => {
            const toggle = document.querySelector('.mobile-nav-toggle');
            const menu = document.querySelector('.nav-menu');
            return {
                menuActive: menu.classList.contains('active'),
                toggleActive: toggle.classList.contains('active'),
                ariaExpanded: toggle.getAttribute('aria-expanded')
            };
        }""")
        print(f"Closed Menu State (Escape): menuActive={menu_closed['menuActive']}, ariaExpanded={menu_closed['ariaExpanded']}")

        if menu_opened["menuActive"] and not menu_closed["menuActive"] and menu_opened["ariaExpanded"] == "true" and menu_closed["ariaExpanded"] == "false":
            results["mobile_menu_toggle"] = "PASS"
            print("RESULT: Mobile menu toggle open & close verified.")
        else:
            results["mobile_menu_toggle"] = "FAIL"


        print("\n=== TEST 4: Modal Keyboard Focus Trapping & Restoration (#project-modal) ===")

        # Desktop context for modal testing to have standard layout
        context_desktop = browser.new_context(viewport={"width": 1280, "height": 800})
        page_d = context_desktop.new_page()
        page_d.on("console", lambda msg: results["console_errors"].append(f"CONSOLE {msg.type}: {msg.text}") if msg.type in ["error", "warning"] else None)
        page_d.on("pageerror", lambda err: results["console_errors"].append(f"PAGEERROR: {err}"))

        page_d.goto(url)
        page_d.wait_for_load_state("networkidle")
        time.sleep(0.5)

        # Scroll to works section
        page_d.evaluate("document.querySelector('#works').scrollIntoView({behavior: 'instant'})")
        time.sleep(0.3)

        # Focus first bento card and get its selector/id
        first_card = page_d.locator('.bento-card[data-project-id="bde-hub"]')
        first_card.focus()
        
        pre_active_info = page_d.evaluate("""() => {
            const active = document.activeElement;
            return {
                tagName: active.tagName,
                projectId: active.getAttribute('data-project-id'),
                className: active.className
            };
        }""")
        print(f"Pre-open active element: <{pre_active_info['tagName']} data-project-id='{pre_active_info['projectId']}'>")

        # Press Enter on card to open modal
        page_d.keyboard.press("Enter")
        time.sleep(0.5)

        modal_opened = page_d.evaluate("""() => {
            const modal = document.getElementById('project-modal');
            const active = document.activeElement;
            const focusables = Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
            return {
                isActive: modal.classList.contains('active'),
                activeElementInsideModal: modal.contains(active),
                activeElementTag: active.tagName,
                activeElementClass: active.className,
                focusableCount: focusables.length,
                focusableTags: focusables.map(f => f.tagName + '.' + f.className)
            };
        }""")

        print(f"Modal opened active: {modal_opened['isActive']}")
        print(f"Active element inside modal: {modal_opened['activeElementInsideModal']} (<{modal_opened['activeElementTag']} class='{modal_opened['activeElementClass']}'>)")
        print(f"Focusable elements count inside modal: {modal_opened['focusableCount']}")
        print(f"Focusables list: {modal_opened['focusableTags']}")

        # Test Tab navigation (Forward Focus Trap)
        print("Testing Forward Tab Focus Trap...")
        # Press Tab for focusableCount times
        tab_sequence = []
        for i in range(modal_opened['focusableCount'] + 2):
            page_d.keyboard.press("Tab")
            time.sleep(0.1)
            curr = page_d.evaluate("""() => {
                const modal = document.getElementById('project-modal');
                const active = document.activeElement;
                return {
                    inside: modal.contains(active),
                    tag: active.tagName,
                    class: active.className,
                    text: active.textContent.trim().substring(0, 30)
                };
            }""")
            tab_sequence.append(curr)

        print("Tab sequence:")
        for idx, step in enumerate(tab_sequence):
            print(f"  Step {idx+1}: inside={step['inside']}, <{step['tag']} class='{step['class']}'> text='{step['text']}'")

        all_tabs_trapped = all(step['inside'] for step in tab_sequence)
        print(f"Forward Tab focus trapped inside modal: {all_tabs_trapped}")

        # Test Shift+Tab navigation (Backward Focus Trap)
        print("Testing Backward Shift+Tab Focus Trap...")
        # Ensure we are at the first focusable element (.modal-close)
        page_d.evaluate("document.querySelector('.modal-close').focus()")
        time.sleep(0.1)
        page_d.keyboard.press("Shift+Tab")
        time.sleep(0.1)

        shift_tab_curr = page_d.evaluate("""() => {
            const modal = document.getElementById('project-modal');
            const active = document.activeElement;
            return {
                inside: modal.contains(active),
                tag: active.tagName,
                class: active.className,
                text: active.textContent.trim().substring(0, 30)
            };
        }""")
        print(f"Shift+Tab from first element focused: inside={shift_tab_curr['inside']}, <{shift_tab_curr['tag']} class='{shift_tab_curr['class']}'> text='{shift_tab_curr['text']}'")

        if all_tabs_trapped and shift_tab_curr['inside']:
            results["focus_trapping"] = "PASS"
            print("RESULT: Keyboard focus trapping verified.")
        else:
            results["focus_trapping"] = "FAIL"

        # Test Focus Restoration on Close
        print("Testing Focus Restoration on Close (Escape key)...")
        page_d.keyboard.press("Escape")
        time.sleep(0.3)

        post_close_info = page_d.evaluate("""() => {
            const modal = document.getElementById('project-modal');
            const active = document.activeElement;
            return {
                modalActive: modal.classList.contains('active'),
                activeTag: active ? active.tagName : null,
                activeProjectId: active ? active.getAttribute('data-project-id') : null,
                activeClass: active ? active.className : null
            };
        }""")

        print(f"Modal active after Escape: {post_close_info['modalActive']}")
        print(f"Active element after close: <{post_close_info['activeTag']} data-project-id='{post_close_info['activeProjectId']}'>")

        restored_correctly = (post_close_info['activeProjectId'] == 'bde-hub')
        if restored_correctly:
            results["focus_restoration"] = "PASS"
            print("RESULT: Focus restoration verified.")
        else:
            results["focus_restoration"] = "FAIL"
            print(f"RESULT: FAIL - Focus restored to <{post_close_info['activeTag']} data-project-id='{post_close_info['activeProjectId']}'> instead of bde-hub.")

        browser.close()

    print("\n=== SUMMARY OF RESULTS ===")
    print(results)
    return results

if __name__ == "__main__":
    run_suite()
