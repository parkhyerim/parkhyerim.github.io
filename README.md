# research-portfolio (GitHub Pages)

A lightweight personal research portfolio built with plain HTML/CSS/JS — designed for PhD candidates preparing for **industry research** and/or **postdoc** applications.

This version follows a clean, modern layout inspired by minimal academic portfolio sites:
- icon-based primary links (Scholar / LinkedIn)
- image-first project cards
- publication list with filter tabs (All / First Author / Full Paper / Poster / Preprint)
- CV section is **commented out** (enable later when you have a PDF)

## Sections included

- Hero (avatar next to name)
- About
- Research Projects (image-first cards)
- Publications (with filter tabs)
- Academic Service
- Contact
- (Optional) CV — commented out
- (Optional) Keywords — commented out

## Quick start

1. Create a GitHub repository:
   - **User site**: `USERNAME.github.io` (recommended), or
   - Project site: any repo name

2. Upload the files in this folder to the repository root.

3. Enable GitHub Pages:
   - Repository → **Settings** → **Pages**
   - Source: Deploy from branch → `main` / `(root)`

4. (Optional) Custom domain:
   - Add your domain under **Settings → Pages → Custom domain**
   - Configure DNS records at your domain provider.

## Local preview

If you have Python 3:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

If you do not have Python, you can also open `index.html` directly.

## Customization checklist

- Replace the name/title/tagline in `index.html`
- Update the Scholar and LinkedIn links
- Add your email (optional; consider spam/obfuscation)
- Add project thumbnails under `assets/projects/`
- Add PDF/DOI/project links for publications
- (Later) Add `cv.pdf` to the repo root and uncomment the CV section

---

Built for GitHub Pages. No build step required.
