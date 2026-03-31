using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVCexample.Data;
using MVCexample.Models;

namespace MVCexample.Controllers;

public class BookController : Controller
{
    private BookContext _context;

    public BookController(BookContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var books = await _context.Book.ToArrayAsync();
        if (books == null) return View("~/Views/Books/Index.cshtml", new List<BookViewModel>());
        return View("~/Views/Books/Index.cshtml", books);
    }

    [HttpGet]
    public async Task<IActionResult> Details(int? id)
    {
        if (id != null)
        {
            var book = await _context.Book.FirstOrDefaultAsync(e => e.Id == id);
            if (book != null)
                return View("~/Views/Books/Details.cshtml", book);
        }

        return View("~/Views/Books/NotBook.cshtml");
    }
}