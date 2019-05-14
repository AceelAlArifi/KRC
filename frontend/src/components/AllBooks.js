import React, { Component } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import CardGroup from 'react-bootstrap/CardGroup'
// import Card from 'react-bootstrap/Card'
import BookCard from './BookCard'
// import Book from "./components/Book";
// import Button from 'react-bootstrap/Button'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class AllBooks extends Component {
    state = {
        books: [],
        open: false,

    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    changeHandler = (e) => {
        let data = { ...this.state }
        data[e.target.name] = e.target.value
        this.setState(data)
    }
    getAllBooks = () => {

        axios.get("http://localhost:3003/books")
            .then(data => {
                console.log("from my api", data)
                if (data.data.books.length > 0) {
                     console.log(data.books)
                    this.setState({
                        books: data.data.books
                    }) //set the state
                }
            })
            .catch(err => console.log(err))
    }

    AddNewBook = () => {
        axios.post("http://localhost:3003/books", {
            //publishedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },        
            "title": this.state.title,
            "author": this.state.author,
            "year": this.state.year,
            "image": this.state.image,
            "ageRange": this.state.ageRange,
        })
            .then(data => {
                console.log("New Book Added", data)
                //     if (data.books){
                //     this.setState({
                //         books: data.books
                //     }) //set the state
                // }
                this.handleClose()
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getAllBooks() // load axios data on component mount
    }

    render() {
        var allbooks = this.state.books.map(book => {
            return <BookCard key={book._id} book={book} />
        })
        return (
            <div>
                <div>
                    <Nav className="mr-auto">
                        <h1>Discover All Books</h1>
                    </Nav>
                </div>
                <CardGroup>
                    {allbooks}
                </CardGroup>
                <Button onClick={this.handleClickOpen}> Add New Book </Button>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Adding new discovery: </DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Dear Explorer, Kindly fill up the book information below:
            </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            name="title"
                            label="Book Title"
                            type="text"
                            fullWidth
                            onChange={this.changeHandler} />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="author"
                            name="author"
                            label="Author"
                            type="text"
                            fullWidth
                            onChange={this.changeHandler} />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="year"
                            name="year"
                            label="Year of publish"
                            type="text"
                            fullWidth
                            onChange={this.changeHandler} />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="image"
                            name="image"
                            label="Book Cover"
                            type="img"
                            fullWidth
                            onChange={this.changeHandler} />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="ageRange"
                            name="ageRange"
                            label="Suitable for explorers from:"
                            type="text"
                            fullWidth
                            onChange={this.changeHandler} />
                    </DialogContent>
                    <DialogContentText>
                                           Thank you for sharing your discoveries with us!
                    </DialogContentText>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.AddNewBook} color="primary">
                            Add
            </Button>
                    </DialogActions>
                </Dialog>
            </div>

        )
    }
}

export default AllBooks
