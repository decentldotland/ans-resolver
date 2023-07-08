<p align="center">
  <a href="https://decent.land">
    <img src="https://raw.githubusercontent.com/decentldotland/ark-protocol/main/img/new-logo.png" height="200">
  </a>
  <h3 align="center"><code>@decentdotland/ans-resolver</code></h3>
  <p align="center"> (reverse)resolver for ANS domains</p>
</p>

## Methods

### 1- `/resolve/:query/:full?`

- `query` : a valid Arweave address or ANS domain.
- `full` (optional): return response as the full ANS user object.

### 2- `/resolve-subdomain/:parent_domain/:query`

- `parent_domain` : a valid ANS domain that issued subdomains.
- `query` : a valid Arweave address or ANS subdomain (target).

### 3- `/find-user/:domain`

- `domain` : a valid ANS domain (primary or owned)

## License
This project is licensed under the [MIT License](./LICENSE)
