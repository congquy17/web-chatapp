import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Cloud, Settings } from "lucide-react";
import MainTabList from "./MainTabList";

function MainTab() {
  return (
    <div className="w-[64px] pt-8 bg-[#0091ff] h-dvh flex flex-col justify-between">
      <ScrollArea className="h-full">
        <div className=" mb-8">
          <Avatar className="size-12 mx-auto">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Avatar>
        </div>
        <MainTabList />
      </ScrollArea>

      <ul
        className={cn(
          "*:flex *:justify-center *:items-center *:h-16 hover:*:bg-[rgba(0,0,0,0.1)] *:cursor-pointer"
        )}
      >
        <li>
          <Cloud color="#FFF" width={28} height={28} />
        </li>
        <li>
          <Settings color="#FFF" width={28} height={28} />
        </li>
      </ul>
    </div>
  );
}

export default MainTab;
