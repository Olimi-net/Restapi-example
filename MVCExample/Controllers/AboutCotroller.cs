using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MVCexample.Models;

namespace MVCexample.Controllers;

public class AboutController : Controller
{
    // return string with arg
    public IActionResult Index() => View("~/Views/About/Index.cshtml");
    
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
