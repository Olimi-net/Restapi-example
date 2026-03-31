
using Microsoft.EntityFrameworkCore;

namespace MVCexample.Data;

public class BookContext : DbContext
{
    public BookContext(DbContextOptions<BookContext> options):base(options)
    {
        
    }

    public DbSet<MVCexample.Models.BookViewModel> Book { get; set; } = default!;
}