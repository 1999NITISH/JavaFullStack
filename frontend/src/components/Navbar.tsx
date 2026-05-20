import { Bell, Search, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md">
      <div className="flex items-center gap-4 bg-slate-900 px-4 py-2 rounded-full w-96 border border-slate-800">
        <Search size={18} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search questions..."
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-slate-800"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500">{user?.role?.replace('ROLE_', '')}</p>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0ea5e9&color=fff`}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-slate-800"
          />
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
