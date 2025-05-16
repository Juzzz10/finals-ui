import Navbar from '../components/Navbar/Navbar';
import Feed from '../components/Feed/Feed';

const Home = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Feed />
      </main>
    </div>
  );
};

export default Home;