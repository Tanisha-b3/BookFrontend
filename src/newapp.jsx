import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "../components/ui/sonner";
import "./App.css";
import BookForm from "./components/BookForm";
import UpdateBook from "./components/UpdateBook";
import BookList from "./components/BookList";
import { Button } from "../components/ui/button";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4 ">Welcome to Book Management</h1>
      <p className="text-lg text-muted-foreground">
        Manage your book collection with ease
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            BookManager
          </Link>
        </div>
        <div className="flex items-center gap-5 ">
          <Link
            to="/"
          >
           <Button> Home</Button>
          </Link>
          <Link
            to="/add-book"
          >
            <Button>Add Book</Button>
          </Link>
          <Link
            to="/books"
          >
           <Button>Book List</Button> 
          </Link>
        </div>
      </nav>

      <main className="container py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<BookForm />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
          <Route path="/books" element={<BookList />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;