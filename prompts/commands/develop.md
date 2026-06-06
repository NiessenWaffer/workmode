# WorkMode Develop

Use the WorkMode Core Prompt.

Task: Implement or modify code safely.

Input: `$ARGUMENTS`

Required behavior:
- use MAP before broad or multi-file edits when available
- use SIG before editing large files when available
- use MATURITY before risky feature work when available
- inspect existing patterns first
- prefer Laravel 7 native solutions
- prefer Eloquent and service reuse over duplicated raw implementations
- keep edits scoped
- do not modify unrelated files
- preserve user changes
- run available verification
- report changed files, risks, and verification
