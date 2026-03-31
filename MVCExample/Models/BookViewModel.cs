namespace MVCexample.Models;

public class BookViewModel
{
    public int Id {get; set;}

    public string? Title {get; set;}

    public string? Author {get; set;}

    public DateTime Created {get; set;}

    public override string ToString()
    {
        return "" + Id + ";" + Title + ";" + Author + ";" + Created.ToString();
    }
}