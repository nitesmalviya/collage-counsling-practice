"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChangePassword from "./change-password"
import PageHeader from "../../ui/page-header"
import EducatorProfile from "./educator-profile"

const Profile = () => {
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
          <PageHeader
              title="My Profile"
              description="Update your personal information"
            />
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile">User Profile Detail</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
            </TabsList>
          
            <EducatorProfile />
             <ChangePassword />
          </Tabs>
        </div>
      </div>
    </div>
  )
}
export default Profile;