import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/auth/logout">Logout</Link>
    </div>
  );
};

export default Home;
