"use client"

import { useState } from "react"
import { StudentNav } from "@/components/navigation/student-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send } from "lucide-react"
import { mockChatConversations, mockMessages } from "@/lib/mock-data"

export default function StudentChat() {
  const [selectedConversation, setSelectedConversation] = useState(mockChatConversations[0].id)
  const [messageInput, setMessageInput] = useState("")

  const currentMessages = mockMessages.filter((m) => m.conversationId === selectedConversation)
  const currentConversation = mockChatConversations.find((c) => c.id === selectedConversation)

  return (
    <div className="min-h-screen bg-background">
      <StudentNav />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">Chat with your educators</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-0">
                {mockChatConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 text-left hover:bg-muted transition-colors ${
                      selectedConversation === conv.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={conv.avatar || "/placeholder.svg"}
                        alt={conv.participantName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conv.participantName}</p>
                          {conv.unread > 0 && (
                            <Badge variant="default" className="ml-2">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-muted-foreground mt-1">{conv.lastMessageTime}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="md:col-span-2 flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <img
                    src={currentConversation?.avatar || "/placeholder.svg"}
                    alt={currentConversation?.participantName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <CardTitle>{currentConversation?.participantName}</CardTitle>
                    <p className="text-sm text-muted-foreground capitalize">{currentConversation?.participantRole}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setMessageInput("")
                      }
                    }}
                  />
                  <Button size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
