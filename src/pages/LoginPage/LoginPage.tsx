import AuthForm from "../../components/AuthForm";

import css from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  return (
    <div className={css.container}>
      <div className={css.formWrapper}>
        <h1>Log In</h1>

        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
