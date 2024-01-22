import { deleteBook, getAllBooks } from "./bookApi";
import { useEffect, useState } from "react";
import ListItem from "./ListItem.js";

const List = () => {
  let [id, setId] = useState("");
  let [arr, setArr] = useState([]);
  let [deletedBook, setDeletedBook] = useState(null);

  useEffect(() => {
    getAllBooks()
      .then((res) => {
        setArr(res.data);
        console.log(res);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, []);

  const isValidMongoId = (id) => {
    // Basic check for MongoDB ObjectId structure
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(id);
  };

  return (
    <>
      <div>the books:</div>
      <ul>
        {arr.map((item) => (
          <li key={item._id}>
            <ListItem one={item} />
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Enter book ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button
        onClick={() => {
          if (!isValidMongoId(id)) {
            alert("Invalid ID format");
            return;
          }

          deleteBook(id)
            .then((res) => {
              setDeletedBook(res.data);
              console.log(res);
            })
            .catch((err) => {
              alert(err);
              console.log(err);
            });
        }}
      >
        Delete Book
      </button>

      {deletedBook && (
        <>
          <h3>the deleted book was:</h3>
          <ListItem one={deletedBook} />
        </>
      )}
    </>
  );
};

export default List;
