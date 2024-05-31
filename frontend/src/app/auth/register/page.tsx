import AuthRegisterClientImplementationForm from "./(clientImplementation)/form";

const AuthRegister: React.FC = () => {
  return (
    <div className="w-full min-h-screen h-full flex flex-col justify-center items-center">
      <h1 className="text-xl">Please inform all details for you new account</h1>

      <AuthRegisterClientImplementationForm />
    </div>
  );
};

export default AuthRegister;
