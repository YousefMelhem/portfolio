# Portfolio evidence review — 2026-10-05

## Scope and source selection

Inspected every portfolio source file (`index.html`, `css/styles.css`, `js/scripte.js`), all image assets, the bundled `images/cv.pdf`, Git status/remotes and repository structure before edits. The original site was a static page with nine cards, no data layer, project detail pages, package manifest or build pipeline. Two cards linked back to `#projects`; actions otherwise relied on hover overlays. The initial working tree was clean.

Authenticated GitHub discovery identified **YousefMelhem/TimeReady** and **YousefMelhem/faktura-generator** as the two recent C# repositories. Both are private. Fresh shallow clones of GitHub default branches were inspected under `/tmp/portfolio-audit`; local working copies differ from GitHub and were not used for their published feature descriptions. No external repository was modified.

- TimeReady inspected commit: `bc244e762d23f4eedd7d301fa4f3a35e67ed17ec`
- faktura-generator inspected commit: `b548af4a9ad306a67c13f196cda8313c4c8e4f8e`

## .NET implementation matrix

| Area | TimeReady | Faktura Generator |
| --- | --- | --- |
| Purpose | Local scheduling, time clocking, attendance review and payroll preparation | Swedish workshop invoicing, PDF output, customer/vehicle history and revenue dashboards |
| Language/runtime | C#; `net10.0`; no explicit C# language-version setting | C#; `net10.0`; no explicit C# language-version setting |
| UI | Avalonia 12.1.0, desktop XAML and C# code-behind | Avalonia 12.1.0, desktop XAML and C# code-behind |
| ASP.NET Core / endpoints / controllers | Absent | Absent |
| Application/business logic | `WorkplaceService`; domain records; attendance calculations and payroll state transitions | `InvoiceCalculator`, `InvoiceValidator`, `InvoicePdfGenerator`; repository interface; UI coordinates workflows |
| Dependency injection | Manual constructor injection of `IWorkplaceRepository`, `IPinHasher`, `IClock`, throttle and export writer; composed in `App.axaml.cs` | `IInvoiceRepository` abstraction, but concrete repository instantiated in `MainWindow`; no DI-container claim |
| Persistence | SQLite via Microsoft.Data.Sqlite 10.0.10 and SQLitePCLRaw.bundle_e_sqlite3 3.0.4 | SQLite via Microsoft.Data.Sqlite 10.0.10 and SQLitePCLRaw.lib.e_sqlite3 2.1.12 |
| Entity Framework / EF Core | Absent; direct SQL | Absent; direct SQL |
| Data handling | Transactional aggregate saves; `PRAGMA user_version` migrations; legacy JSON import; backup validation/rotation/restore | Parameterized SQL; constraints and indexes; versioned migrations; transactional writes; invoice snapshots; daily aggregate retention summaries; number sequences |
| Authentication/authorization | PIN authentication with salted PBKDF2-HMAC-SHA256, constant-time verification, in-memory attempt throttling; employee/manager/admin access levels and manager checks for payroll operations | No account/authentication system found |
| Async/await | Awaited native backup/restore/export file pickers; database and application methods are synchronous | Awaited save picker and PDF file writes; PDF rendering and SQLite operations are synchronous |
| Models / DTOs | Employee, ScheduledShift, ClockEvent, AttendanceCorrection, PayrollPeriod, audit/export records, timesheet review records; no HTTP DTO claim | Invoice, InvoiceLine, CompanyProfile, customer/vehicle snapshots, dashboard summary/revenue records; no HTTP DTO claim |
| Validation | First-run setup/PIN rules, schedule/break validation, attendance state checks, correction reasons, locked-period rules, export preconditions | Required invoice/customer/vehicle data; postcode/email/registration/numeric validation; normalization; positive quantity/nonnegative price checks; duplicate invoice/customer-number checks |
| Testing | xUnit 2.9.3; Microsoft.NET.Test.Sdk 17.14.1; coverlet collector. Tests cover persistence, migrations, setup, PIN hashing/throttling, backups, attendance and payroll | No automated test project/suite found. Manual bug-report evidence and PDF scenario tools exist; do not call these unit tests |
| Docker | Absent | Absent |
| External integrations | Local CSV payroll export; no payroll-service API | QuestPDF 2026.7.1 for local PDFs; JSON company profiles; no payment/billing-service API |
| Architecture | Domain/application/infrastructure/presentation boundaries in one desktop project; ports for persistence, time, hashing and export | Domain rules + repository interface/SQLite adapter + PDF component + presentation code; no claim of strict Clean Architecture or MVVM |
| CI/release | GitHub Actions restore/build/test; tagged self-contained Windows installer using Inno Setup; signing conditional on secrets | GitHub Actions build matrix for Windows/macOS/Linux; tagged company-specific installers/packages for Windows, Intel/ARM macOS and Linux |
| Deployment | No verified hosted application | No verified hosted application |

### Exact evidence paths

TimeReady:

- `README.md`, `docs/ARCHITECTURE.md`, `apps/desktop/README.md`
- `apps/desktop/TimeReady.Desktop.csproj`, `apps/desktop.tests/TimeReady.Desktop.Tests.csproj`
- `apps/desktop/App.axaml.cs`
- `apps/desktop/Application/WorkplaceService.cs`, `IWorkplaceRepository.cs`, `IClock.cs`, `IPayrollExportWriter.cs`, `IWorkplaceBackupRepository.cs`
- `apps/desktop/Application/Security/Pbkdf2PinHasher.cs`, `PinAttemptThrottle.cs`
- `apps/desktop/Domain/*.cs`
- `apps/desktop/Infrastructure/SqliteWorkplaceRepository.cs`, `CsvPayrollExportWriter.cs`
- `apps/desktop/Presentation/MainWindow.axaml.cs`
- `apps/desktop.tests/WorkplaceTests.cs`
- `.github/workflows/ci.yml`, `.github/workflows/release.yml`

Faktura Generator:

- `README.md`, `FakturaGenerator.csproj`, `BUGS.md`
- `Domain/Invoice.cs`, `InvoiceLine.cs`, `InvoiceCalculator.cs`, `InvoiceValidator.cs`, `CompanyProfile.cs`
- `Application/InvoiceRepository.cs`
- `Infrastructure/Sqlite/SqliteInvoiceRepository.cs`
- `Presentation/MainWindow.axaml.cs`, `App.axaml.cs`
- `Pdf/InvoicePdfGenerator.cs`
- `.github/workflows/build.yml`, `.github/workflows/release.yml`

The Faktura README contains older “manual numbering” and “company information in code” bullets alongside newer sections. Portfolio descriptions follow the actual sequence allocation and profile-loading implementation.

## Other project evidence

- **AWAITS / InKuiS:** bundled CV plus existing local research repositories. Inspected package manifests, server routes/models, auth/role handling, AWAITS assistant file/vector-store and feedback streaming code, InKuiS geocoding/event validation/chatbot code, Docker/CI configuration. Used contribution language, not sole authorship. No copied credentials or personal data belong in portfolio content.
- **Medical Case Visual Analytics Platform:** fresh public `YousefMelhem/medical-visual-analytics` clone; README, Nuxt/Vue/D3 manifest, FastAPI requirements and API code. Public GitHub link replaces the old self-link. Its current manifest uses Nuxt 4; the card deliberately says Nuxt/Vue without borrowing Nuxt 3 from other projects.
- **RiskRank:** bundled CV and local `school/AutomatedSecurity/Research/experiment` README and Python pipeline code. Described as a master's thesis prototype. No invented repository, deployment, benchmark score or production CI integration.
- **RAG Academic Writing Tutor:** bachelor-thesis description in the bundled CV; related retrieval/vector-store implementations inspected in AWAITS. No separate thesis repository located; no invented GitHub/demo link or evaluation metrics.
- **Compiler:** public `Matars/compiler` clone, grammar, symbol/type-checking files, Python and ASM code generation. Retained shared public repository.
- **Dashboards:** existing screenshots/content, local D3 project sources and working public deployment responses. Added their actual public repository URLs from account discovery.
- **Squat Analysis:** local `school/4DT907-data-intensive-system` Flask prediction routes load MLflow models by alias; React/TypeScript frontend, Docker and API tests present. Removed unsupported “real-time” phrasing and self-link.
- **Museum:** authenticated account listing confirms Datorgrafik is private; source inspection verifies Python/OpenGL/SDL2/GLSL. Marked source link private.

## Links and evidence limits

Checked 2026-10-05:

| Destination | Result / portfolio handling |
| --- | --- |
| GitHub TimeReady / faktura-generator | Exist; authenticated clones succeeded; private links explicitly labelled |
| GitHub medical-visual-analytics / Matars/compiler | Public HTTP 200 and inspected clones |
| GitHub Advanced-Information-Visualization / Information-Visualization | Public repositories confirmed by GitHub account API; live sites below respond |
| GitHub Datorgrafik | Exists privately; unauthenticated 404 is expected; labelled private |
| InKuiS | HTTP 200, application title confirmed; live link retained |
| AI Impact 2030 | HTTP 200, application title confirmed; live link retained |
| Global Demographics | HTTP 200, application title confirmed; live link retained |
| AWAITS | HTTP 502 at review; demo action omitted, project retained. Availability may be temporary |
| Old portfolio `https://yousefmelhem.github.io/` | HTTP 404; removed stale `og:url` and absolute image URL rather than inventing hosting |

A successful home-page response is not proof of all backend behavior. No .NET app was deployed or run as part of the portfolio update. Test-suite presence is verified from code, not a claim that its tests were run here. CI files establish configured workflows, not successful release history or signed binaries.

## Positioning and hierarchy

Featured order: AWAITS, TimeReady, Faktura Generator, InKuiS, Medical Case Visual Analytics, RiskRank. Professional full-stack work and .NET evidence share the first rows. RAG research, compiler, dashboards, squat analysis and graphics remain in the secondary collection. The generic GitHub profile card became a simple profile link. No substantive existing project was removed.

The original May 2026 PDF was replaced on 2026-10-05 with `/home/yousef/Desktop/cv/CV_Yousef_Mohammad.pdf`, which confirms the C#/.NET project stacks, the M.Sc. dates (2021–2026), and the Research Engineer role dates (June 2024–July 2026). The hero/about now use the updated Software Engineer profile and dated role. No graphics or AI editor tools were promoted into the focused skill groups; graphics evidence remains on its project.

No ASP.NET Core, EF Core, .NET web API, Docker for the desktop apps, invoicing authentication, invented screenshots, commercial scale, users, performance metrics, compliance guarantees or unverified live deployments were added.
