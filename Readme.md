# Lucia CLI

A CLI for [Lucia](https://lucia-auth.com/).

## Installation

### With deno

```sh
deno run -A https://deno.land/x/lucia_cli/cmd/main.ts
```

or if you want to install it globally

```sh
deno install -A -n lucia https://deno.land/x/lucia_cli/cmd/main.ts
```

and then

```sh
lucia
```

### with npm

```sh
npm i -D lucia-cli
```

and then

```sh
npx lucia
```

or if you want to install it globally

```sh
npm i -g lucia-cli
```

and then

```sh
lucia
```

### From source

```sh
deno run -A ./cmd/main.ts
```

or if you are on posix systems (Linux, MacOS, etc.) you can run the `lucia`
script provided.

```sh
chmod +x ./lucia # make the script executable, you only need to do this once
```

and then

```sh
./lucia
```
