import React from "react";
import { Formik, Form, Field } from "formik";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileSettings() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      <Formik
        initialValues={{
          name: "",
          username: "",
          theme: false,
          notifications: true,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Field as={Input} name="name" id="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Field as={Input} name="username" id="username" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Field as={Input} name="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Field as={Input} name="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Field as={Input} name="confirmPassword" type="password" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Preferences</h2>
                <div className="flex items-center justify-between">
                  <Label>Dark Theme</Label>
                  <Switch
                    checked={values.theme}
                    onCheckedChange={(val) => setFieldValue("theme", val)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Switch
                    checked={values.notifications}
                    onCheckedChange={(val) => setFieldValue("notifications", val)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-500">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>

            <div className="text-right">
              <Button type="submit">Save Changes</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}