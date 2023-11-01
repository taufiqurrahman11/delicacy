import Logo from '../Logo';
import Navbar from '../Navbar';
import Content from '../Content';
import Footer from '../Footer';
import styleHome from '../../style/base.module.scss';

function Home() {
  return (
    <div id='root' className={styleHome.root}>
      <Logo />
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}

export default Home;
