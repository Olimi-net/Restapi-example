#if _MDF_
using Microsoft.Data.SqlClient;
#endif
using Microsoft.EntityFrameworkCore;
using MVCexample.Models;

namespace MVCexample.Data;

public static class Library
{
    public static void Init(IServiceProvider service)
    {
        using(var context = new BookContext(service.GetRequiredService<DbContextOptions<BookContext>>()))
        {
            if(context.Book.Any()) return;
            context.Book.AddRange(
                new BookViewModel{ Id = 4, Author = "Efremov", Title = "Way of stone", Created = DateTime.Now.ToUniversalTime() },
                new BookViewModel{ Id = 11, Author = "Stefan", Title = "Door into void", Created = DateTime.Now.ToUniversalTime() },
                new BookViewModel{ Id = 14, Author = "Tukh", Title = "Notes", Created = DateTime.Now.ToUniversalTime() }
            );
            context.SaveChanges();
        }
    }
}