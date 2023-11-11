namespace Authenticate.ViewModels
{
    public class DynamicMenuVM
    {
        public IList<MainMenuVM>? MainMenuVMList { get; set; }
    }

    public class MainMenuVM
    {
        public long Id { get; set; }

        public long? ParentId { get; set; }

        public string? Name { get; set; }

        public string? Icon { get; set; }

        public string? Url { get; set; }

        public bool IsMenu { get; set; }

        public int Precedence { get; set; }
        public IList<SubMenuVM>? SubMenuVMList { get; set; }
    }

    public class SubMenuVM
    {
        public long Id { get; set; }

        public long? ParentId { get; set; }

        public string? Name { get; set; }

        public string? Icon { get; set; }

        public string? Url { get; set; }

        public bool IsMenu { get; set; }

        public int Precedence { get; set; }
    }
}
