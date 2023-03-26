import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import ReceivedMessage from "../ui/ReceivedMessage";
import SentMessage from "../ui/SentMessage";
import { useContext } from "react";
import { DataContext } from "../contexts/dataContext";
import ChatInput from "../ui/ChatInput";

import ChatScrollHook from "../hooks/ChatScrollHook";

function Chat() {
  const { messages, username } = useContext(DataContext);
  const ref = ChatScrollHook(messages);

  function compare(a, b) {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  }

  const uniqueMessages = messages
    .filter(
      (obj, index, arr) => index === arr.findIndex((o) => o.id === obj.id)
    )
    .sort(compare);

  return (
    <div>
      <Navbar />
      <div className="bg-tPurple mr-100 pt-6 w-screen">
        <div class="flex h-screen antialiased text-gray-800">
          <div class="flex flex-row h-full w-full overflow-x-hidden">
            {/* <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div class="flex flex-row items-center justify-center h-12 w-full">
                <div class="flex items-center justify-center rounded-none text-indigo-700 bg-indigo-100 h-10 w-10"></div>
              </div>
            </div> */}
            <div class="flex flex-col flex-auto h-full p-6" ref={ref}>
              <div class="flex flex-col flex-auto flex-shrink-0 rounded-none bg-gray-100 h-full p-4">
                <div class="flex flex-col h-full overflow-x-auto mb-4">
                  <div class="flex flex-col h-full">
                    <div class="grid grid-cols-12 gap-y-2">
                      {uniqueMessages.map((message) =>
                        message.user === username ? (
                          <SentMessage message={message} />
                        ) : (
                          <ReceivedMessage message={message} />
                        )
                      )}
                      {/* <div class="col-start-1 col-end-8 p-3 rounded-none">
                        <div class="flex flex-row items-center">
                          <div class="flex items-center justify-center h-10 w-10 rounded-none bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div class="relative ml-3 text-sm bg-white py-2 px-4 border-2 rounded-none">
                            <div>Hey How are you today?</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-start-1 col-end-8 p-3 rounded-none">
                        <div class="flex flex-row items-center">
                          <div class="flex items-center justify-center h-10 w-10 rounded-none bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div class="relative ml-3 text-sm bg-white py-2 px-4 border-2 rounded-none">
                            <div>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Vel ipsa commodi illum saepe
                              numquam maxime asperiores voluptate sit, minima
                              perspiciatis.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-start-6 col-end-13 p-3 rounded-none">
                        <div class="flex items-center justify-start flex-row-reverse">
                          <div class="flex items-center justify-center h-10 w-10 rounded-none bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 border-2 rounded-none">
                            <div>I'm ok what about you?</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-start-6 col-end-13 p-3 rounded-none">
                        <div class="flex items-center justify-start flex-row-reverse">
                          <div class="flex items-center justify-center h-10 w-10 rounded-none bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 border-2 rounded-none">
                            <div>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing. ?
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-start-1 col-end-8 p-3 rounded-none">
                        <div class="flex flex-row items-center">
                          <div class="flex items-center justify-center h-10 w-10 rounded-none bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div class="relative ml-3 text-sm bg-white py-2 px-4 border-2 rounded-none">
                            <div>Lorem ipsum dolor sit amet !</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-start-6 col-end-13 p-3 rounded-none">
                        <div class="flex items-center justify-start flex-row-reverse">
                          <div class="flex items-center justify-center h-10 w-10 rounded-none bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 border-2 rounded-none">
                            <div>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing. ?
                            </div>
                            <div class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                              Seen
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-start-1 col-end-8 p-3 rounded-none">
                        <div class="flex flex-row items-center">
                          <div class="flex items-center justify-center h-10 w-10 rounded-none bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div class="relative ml-3 text-sm bg-white py-2 px-4 border-2 rounded-none">
                            <div>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Perspiciatis, in.
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <ChatInput />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
