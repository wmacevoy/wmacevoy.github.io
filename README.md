# Ram Banset

## Homepage

- created using Nextjs

## Deploy to GitHub
- install nodejs (v16^) and nextjs
- [https://nextjs.org/learn/basics/deploying-nextjs-app/github](https://nextjs.org/learn/basics/deploying-nextjs-app/github)

```bash
$ conda create -n nodejs python=3.x
$ conda install -c conda-forge nodejs
$ conda activate nodejs
$ npm install
$ npm run deploy
```

## Docker build

```bash
docker build -t github-pages-nextjs-py3 .
```

## Docker develop (https://localhost:3000)

```bash
docker run -v "$(pwd)":/app --rm github-pages-nextjs-py3 npm dev
```

## Docker deploy

```bash
docker run -v "$(pwd)":/app --rm github-pages-nextjs-py3 npm deploy
```
