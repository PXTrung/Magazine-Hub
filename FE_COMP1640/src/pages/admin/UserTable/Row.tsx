/* eslint-disable jsx-a11y/img-redundant-alt */
import { IUserData } from "../../../types/user.type";
import avatar from "../../../assets/images/Avatar.png";

interface IRowProps {
   user?: IUserData;
   label?: string[];
}

const Row = ({ user, label }: IRowProps) => {
   return (
      <div className="grid grid-cols-12 items-center gap-3 py-4 bg-white border-t border-t-slate-200 min-w-[650px]">
         <img
            src={user?.avatarUrl || avatar}
            alt="avatar"
            className="col-span-1 truncate h-8 object-contain"
         />
         <span className="col-span-3 truncate">{user?.fullName}</span>
         <span className="col-span-3 truncate">{user?.email}</span>

         <span className="col-span-2 truncate">{user?.facultyName || "-"}</span>
         <div className="h-full col-span-2 text-left truncate text-xs font-medium text-gray-600 flex justify-start items-center">
            {user?.role}
         </div>
         <span className="col-span-1">
            <label className="relative inline-flex cursor-pointer items-center">
               <input id="switch" type="checkbox" className="peer sr-only" />
               <label htmlFor="switch" className="hidden"></label>
               {/* <div className="peer h-7 w-12 rounded-full border-2 bg-slate-200 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div> */}
               <div className="peer h-7 w-12 rounded-full border-2 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] bg-cyan-500 after:translate-x-full after:border-white"></div>
            </label>
         </span>
      </div>
   );
};

export default Row;
