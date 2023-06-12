import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { getContent } from "../uploader/gofile";
import { ROOTFOLDER } from "../utils/constants";

interface BasicMenuProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
}

export const BasicMenu: React.FC<BasicMenuProps> = ({
  setInputValue,
  setSelectedFolder,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [results, setResults] = React.useState<{ id: string; name: string }[]>(
    []
  );

  React.useEffect(() => {
    const getFolderContents = async () => {
      getContent(ROOTFOLDER).then((data: any) => {
        setResults(convertToObjectArray(data.contents));
      });
    };
    getFolderContents();
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const convertToObjectArray = (data: any) =>
    Object.keys(data).map((key) => {
      const { id, name } = data[key];
      return { id, name };
    });

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Use existing folder
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {results.length &&
          results.map((item, index) => (
            <MenuItem
              onClick={() => {
                setInputValue(item.name);
                setSelectedFolder(item.id);
                handleClose();
              }}
            >
              {item.name}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};
