    # PDF File Structure

## Directory Layout

```
public/
├── matematik_prov/         # Mathematics exam PDFs
│   ├── 1.pdf              # 2007
│   ├── 2.pdf              # 2008
│   └── ...                # Continue incrementally
├── matematik_losningar/   # Mathematics solution PDFs
│   ├── 1.pdf              # 2007
│   ├── 2.pdf              # 2008
│   └── ...                # Continue incrementally
├── fysik_prov/            # Physics exam PDFs
│   ├── 1.pdf              # 2007
│   ├── 2.pdf              # 2008
│   └── ...                # Continue incrementally
└── fysik_losningar/       # Physics solution PDFs
    ├── 1.pdf              # 2007
    ├── 2.pdf              # 2008
    └── ...                # Continue incrementally
```

## File Naming Convention

- Files are numbered sequentially starting at `1.pdf`
- `1.pdf` corresponds to the year 2007
- `2.pdf` corresponds to the year 2008
- Continue incrementally for later years
- Formula: `filename = (year - 2006).pdf`

## Examples

- Year 2007 → `1.pdf`
- Year 2008 → `2.pdf`
- Year 2015 → `9.pdf`
- Year 2025 → `19.pdf`

## Security Notes

While the PDFs are served from the public folder for display purposes, the solution PDFs include:
- Blur effect when "eye" is closed
- Disabled pointer events when blurred
- View-only access through iframe

For production deployment, consider:
- Server-side authentication checks
- Watermarking solution PDFs
- Session-based access control
- Content Security Policy headers
