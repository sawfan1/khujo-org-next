"use client"


import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, Handshake, House, LogIn, Search } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

import { Poppins } from "next/font/google";

const components: { title: string, description: string, href: string }[] = [
  {
    title: "Student Window",
    description: "View your options as a student, see relevant companies",
    href: "/view/students"
  },
  {
    title: "Corporate Section",
    description: "Set-up your business, manage volunteer flow",
    href: "/view/host"
  },
  {
    title: "Find Help",
    description: "FAQs are covered for your relevant case, check them out",
    href: "/view/faq"
  },
  {
    title: "Placeholder item",
    description: "Lorem ipsum dolor sit amet para no siento del quiero queso",
    href: "/blank"
  }
]

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
});

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-[90%] px-4">
      <h2 className="font-bold">KHUJO.org</h2>
      <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent"><House className="mr-2"/>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-white to-emerald-100 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      Welcome to KHUJO.org
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Bridging the gap between volunteers and employers.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                What the organisation is all about.
              </ListItem>
              <ListItem href="/docs/installation" title="Vision">
                The company vision.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Goals">
                What the company aims to achieve in the short and long run.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent"><Search className="mr-2" /> Discover</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[550px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent"><Handshake className="mr-2"/>Partner</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">As a volunteer</div>
                    <div className="text-muted-foreground">
                      Get to work with a plethora of organisations.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">As a business</div>
                    <div className="text-muted-foreground">
                      Hire fresh, young and hungry talent.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">Blog</div>
                    <div className="text-muted-foreground">
                      Read our latest blog posts.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>
      <Button className="bg-indigo-400 hover:bg-indigo-600 cursor-pointer"><LogIn /> Log In</Button>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
