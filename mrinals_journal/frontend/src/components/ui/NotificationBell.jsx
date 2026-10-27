import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotifications } from '../../hooks/useNotifications'
import { Bell } from "lucide-react"
import { deleteOne, markAllRead, markOneRead } from '../../redux/slices/notificationSlice'

import NotificationDropdown from "./NotificationDropdown";

const NotificationBell = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const dispatch = useDispatch()
    const { items, unreadCount } = useNotifications()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])


    const handleMarkAllRead = () => dispatch(markAllRead())
    const handleMarkOne = (id) => dispatch(markOneRead(id))
    const handleDelete = (id) => dispatch(deleteOne(id))



    return (
        <div className='relative' ref={ref}>
            {/* Bell button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className='relative p-1 transition-colors cursor-pointer'
                style={{ color: 'var(--color-text-muted)' }}
            >
                <Bell size={20} />
                {/* Red badge - only shows when there are unread notifications */}
                {unreadCount > 0 && (
                    <span
                        className='absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center'
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>
            {/* Dropdown */}
            {open && (
                <NotificationDropdown
                    items={items}
                    onMarkAllRead={handleMarkAllRead}
                    onMarkOne={handleMarkOne}
                    onDelete={handleDelete}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    )
}

export default NotificationBell