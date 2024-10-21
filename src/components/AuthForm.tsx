import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Form, Input, Button, Spin, Alert } from "antd";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const AuthForm = observer(() => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await authStore.login(login, password);
      if (authStore.isAuthenticated) {
        navigate("/");
      } else {
        setErrorMessage("Помилка авторизації. Перевірте ваші дані.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Сталася помилка.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form>
      <Form.Item label="Логин">
        <Input
          value={login}
          onChange={(e: { target: { value: string } }) =>
            setLogin(e.target.value)
          }
        />
      </Form.Item>
      <Form.Item label="Пароль">
        <Input.Password
          value={password}
          onChange={(e: { target: { value: string } }) =>
            setPassword(e.target.value)
          }
        />
      </Form.Item>

      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          style={{ marginBottom: 16 }}
        />
      )}

      {loading ? (
        <Spin />
      ) : (
        <Button type="primary" onClick={handleLogin} disabled={loading}>
          Увійти
        </Button>
      )}
    </Form>
  );
});

export default AuthForm;
