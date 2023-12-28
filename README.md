# CodeIt

CodeIt is an interactive coding platform that provides a seamless environment for coding practice. With a built-in code editor, a diverse set of coding problems, and integrated test cases, CodeIt is designed to enhance your coding skills and make learning fun.

## Getting Started

First, clone the repo:

```bash
git clone https://github.com/shreyanshxyz/CodeIt
```

Then, navigate to the cloned folder:

```bash
cd CodeIt
```

Then, install all the dependencies:

```bash
npm install
# or
yarn install
```

Then finally, run the app in development:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Screenshots

Here are some screenshots from the CodeIt project:

- Main Page
  ![main_page.png](https://pasteimg.com/images/2023/12/28/main_page.png)
- Authentication
  ![auth.png](https://pasteimg.com/images/2023/12/28/auth.png)
- Problem
  ![problemset.png](https://pasteimg.com/images/2023/12/28/problemset.png)
- Code Playground
  ![playground.png](https://pasteimg.com/images/2023/12/28/playground.png)
- Confetti
  ![confetti.png](https://pasteimg.com/images/2023/12/28/confetti.png)

## Environment Variables (.env)

Create a `.env.local` file in the root of your project and add the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=
```

## Dependencies

CodeIt relies on the following dependencies:

###### Dependencies:

- firebase
- next
- react-confetti
- react-firebase-hooks
- react-icons
- react-split
- react-toastify
- react-youtube
- recoil
- typescript

###### Dev Dependencies:

- autoprefixer
- postcss
- tailwindcss
