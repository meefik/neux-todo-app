import { createView } from 'neux';
import router from './router';
import Header from './views/header';
import Footer from './views/footer';
import Todo from './views/todo';
import NotFound from './views/notfound';

const views = {
  todo: Todo
};

createView({
  classList: ['mx-auto', 'max-w-lg', 'px-4'],
  children: [{
    view: Header
  }, {
    tagName: 'main',
    classList: ['py-6'],
    children: () => {
      const View = views[router.$path];
      return View || NotFound;
    }
  }, {
    view: Footer
  }]
}, { target: document.body });
