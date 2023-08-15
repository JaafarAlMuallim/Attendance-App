import CredentialsProvider from "next-auth/providers/credentials";
export const authConfig = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8080/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials!.email,
            password: credentials!.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const org = await res.json();
        if (org) return org;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "./auth/signin",
  },
};
