import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  created_at: string;
}

interface ProfileHeaderProps {
  userInfo: UserInfo;
}

export default function ProfileHeader({ userInfo }: ProfileHeaderProps) {
  const initials = userInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const joinedDate = new Date(userInfo.created_at).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://bundui-images.netlify.app/avatars/08.png" alt="Profile" />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full">
              <Camera />
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{userInfo.name}</h1>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {userInfo.email}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Entrou em {joinedDate}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}