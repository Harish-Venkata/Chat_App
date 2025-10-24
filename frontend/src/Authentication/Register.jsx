import { SignUp } from "@clerk/clerk-react";
import React from "react";

const Register = () => {
  return (
    <div className="flex flex-grow items-center justify-center h-screen">
      <SignUp signInUrl="/login" forceRedirectUrl={"/main"} />
    </div>
  );
};

export default Register;
