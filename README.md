# Set as Pre Release

Set some release as pre release

## Usage

### Inputs

### token

**Required** `String` Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

### selected_repository_ids

### Outputs

### status

Response status code

### data

Response json payload

## Examples

### For personal repo

```YAML
name: Set release as Prerelease
on:
  push:
    tags:
      - '*'
jobs:
  set-pre-release:
    runs-on: ubuntu-latest
    steps:
      - uses: cejaramillof/set-pre-release@latest
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          keywords: |
            rc
            test
```

## References

### References for repository

- [Get a repository public key](https://developer.github.com/v3/actions/secrets/#get-a-repository-public-key)
- [Get release by tagname](https://docs.github.com/es/rest/reference/releases#get-a-release-by-tag-name)
- [Update a release](https://docs.github.com/es/rest/reference/releases#update-a-release)
