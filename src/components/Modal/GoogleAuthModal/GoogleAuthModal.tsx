import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";

import { AppDispatch } from "@store/index";
import { userLogin } from "@store/auth/actions";
import Modal from "@components/Modal/Modal";
import GoogleAauthBtn from "@components/Buttons/GoogleAuthBtn/GoogleAauthBtn";

type Props = {
  onClose: () => void;
  message?: string;
};

function GoogleAuthModal({ onClose, message = "" }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const [user, setUser] = useState<TokenResponse | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      dispatch(userLogin(user.access_token));
      onClose();
    }
  }, [user]);

  return (
    <Modal onClose={onClose}>
      <h3>Login</h3>
      <p>{message}</p>
      <GoogleAauthBtn onClick={() => login()} />
    </Modal>
  );
}

export default GoogleAuthModal;
