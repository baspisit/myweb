# Curated publication source

The primary sources are `selected-publications.txt` and `recent-publications.txt` in the project root. Run:

```powershell
npm run import-publications
```

Optional command arguments can point to alternative selected and recent BibTeX or JSON sources. JSON records support `title`, `authors`, `journal`, `year`, `volume`, `issue`, `pages`, `doi`, `abstract`, `graphicalAbstract`, `relatedSoftware`, `relatedResearch`, `pdf`, `citationCount`, and `type`.
