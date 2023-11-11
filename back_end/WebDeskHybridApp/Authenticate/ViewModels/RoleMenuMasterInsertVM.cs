namespace Authenticate.ViewModels
{
    public class RoleMenuMasterInsertVM
    {
        public long RoleId { get; set; }
        public virtual IList<MenuListVM> menuList { get; set; }
    }
}
