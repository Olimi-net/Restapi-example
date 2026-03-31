using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVCexample.Data;
using MVCexample.Models;

namespace MVCexample.Controllers;

public class ApiController : Controller
{
    private BookContext _context;

    public ApiController(BookContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<BookViewModel>> Index()
    {
        var books = await _context.Book.ToArrayAsync();
        if (books == null) return [];
        return books;
    }

    [HttpGet]
    public async Task<IEnumerable<BookViewModel>> Details(int? id)
    {
        if (id != null)
        {
            var book = await _context.Book.FindAsync(id);
            if (book != null)
                return [book];
        }
        return [];
    }

    [HttpPost]
    public async Task<IEnumerable<SimpleId>> Create([FromBody] BookViewModel book)
    {
        if (ModelState.IsValid)
        {
            if (book == null) return [];
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            var simple = new SimpleId() { Id = book.Id };
            return [simple];
        }
        return [];
    }

    [HttpPut]
    public async Task<IEnumerable<SimpleId>> Update([FromBody] BookViewModel book)
    {
        if (book == null) return [];
        var bookData = await _context.Book.FindAsync(book.Id);
        if (bookData != null)
        {

            bookData.Author = book.Author;
            bookData.Title = book.Title;
            if (await TryUpdateModelAsync<BookViewModel>(bookData))
            {
                await _context.SaveChangesAsync();
            }
        }

        return [];
    }

    [HttpDelete]
    public async Task<IEnumerable<SimpleId>> Remove(int? id)
    {
        var book = await _context.Book.FindAsync(id);
        if (book != null)
        {
            _context.Book.Remove(book);
            await _context.SaveChangesAsync();
        }
        return [];
    }
}