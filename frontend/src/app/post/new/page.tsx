import Navbar from "@/components/navbar";
import NewPostClientImplementationForm from "./(clientImplementation)/form";

const NewPostPage: React.FC = () => {
  return (
    <>
      <Navbar />

      <main className="w-4/5 mx-auto justify-center items-center text-center mt-4">
        <h1 className="text-2xl">Create a new post</h1>

        <NewPostClientImplementationForm />
      </main>
    </>
  );
};

export default NewPostPage;
