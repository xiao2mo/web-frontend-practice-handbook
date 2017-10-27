[![返回目录](https://parg.co/US3)](https://parg.co/UGZ) 
 
This is still fairly simple yet, if we need to move data from the App component down to CommentItem component, we have to send down to CommentList first before CommentItem. It's even more tedious when raising events from CommentItem to be handled by the App component.

It gets worse when you try to another another child to CommentItem. Probably a CommentButton component. This means when the button is clicked, you have to tell CommentItem, which will tell CommentList, and finally App. Trying to illustrate this already gives me headache, then consider when you have to implement it in a real project.

You might be tempted to keep local states for every component where that could work. The problem is, you will easily loose track of what exists and why a particular event is happening at a given time. It is easy to loose data sync which ends you up in a pool of confusion.

![](https://cdn.scotch.io/10/1hbdfyVuQqKWpDYEMXi2_Screen%20Shot%202017-05-08%20at%205.28.21%20PM.png)