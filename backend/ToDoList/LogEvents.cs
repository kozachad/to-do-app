using System.IO;
namespace ToDoList
{
    public static class LogEvents
    {
        public static void LogToFile(string Title, string LogMessages, IWebHostEnvironment env)
        {
            string logFolderPath = Path.Combine(env.ContentRootPath, "LogFolder");
            if (!Directory.Exists(logFolderPath))
            {
                Directory.CreateDirectory(logFolderPath);
            }
            string Filename = DateTime.Now.ToString("ddMMyyyy") + ".txt";
            string logPath = Path.Combine(logFolderPath, Filename);
            StreamWriter swlog;

            if (!File.Exists(logPath))
            {
                swlog = new StreamWriter(logPath);
            }
            else
            {
                swlog = File.AppendText(logPath);
            }
            swlog.WriteLine("Log Entry");
            swlog.WriteLine("{0} {1}", DateTime.Now.ToLongDateString(), DateTime.Now.ToLongTimeString());
            swlog.WriteLine("Message Title : {0}", Title);
            swlog.WriteLine("Message  : {0}", LogMessages);
            swlog.WriteLine("------------------------------------------");
            swlog.WriteLine("");
            swlog.Close();
        }
    }
}
