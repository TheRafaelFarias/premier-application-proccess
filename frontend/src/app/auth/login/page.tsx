import AuthLoginClientImplementationForm from "./(clientImplementation)/form";

const AuthRegister: React.FC = () => {
  return (
    <div className="w-full min-h-screen h-full flex flex-col justify-center items-center">
      <h1 className="text-xl">Please inform you login details</h1>

      <AuthLoginClientImplementationForm />
    </div>
  );
};

export default AuthRegister;
