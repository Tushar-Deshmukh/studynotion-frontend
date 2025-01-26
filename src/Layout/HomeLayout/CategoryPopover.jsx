import { List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryPopover = ({ categories, setPopoverOpen }) => {
  const navigate = useNavigate();
  return (
    <div
      id="popover-default"
      role="tooltip"
      className="absolute z-10 w-64 text-sm text-black transition-opacity duration-300 bg-white b rounded-lg  opacity-100"
      style={{
        top: "110%",
        left: "50%",
        transform: "translateX(-55%)",
      }}
      onMouseEnter={() => setPopoverOpen(true)}
      onMouseLeave={() => setPopoverOpen(false)}
    >
      <div className="py-2 relative">
        <div className="w-4 h-4 bg-white absolute left-[50%] top-[-6px] rotate-45 rounded-sm"></div>
        <List>
          {categories.length > 0 &&
            categories.map((category, i) => {
              return (
                <ListItem
                  key={category?._id}
                  button
                  onClick={() => {
                    setPopoverOpen(false);
                    navigate(`/course-details?id=${category?._id}`);
                  }}
                >
                  <ListItemText primary={category?.name} />
                </ListItem>
              );
            })}
        </List>
      </div>
    </div>
  );
};

export default CategoryPopover;
