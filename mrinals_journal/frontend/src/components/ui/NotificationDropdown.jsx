
import React from 'react'
import { X, CheckCheck, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { timeAgo } from '../../utils/timeAgo'


const Type_Labels = {
    new_application: "📋 New Application",
    application_update: "📬 Application Update",
    new_comment: "💬 New Comment",
    post_bookmarked: "🔖 Bookmarked",
}

const NotificationDropdown = ({ items, onMarkAllRead, onMarkOne, onDelete, onClose }) => {
    const navigate = useNavigate()

    const handleClick = (notif) => {
        if (!notif.read) onMarkOne(notif._id)
        if (notif.link) {
            navigate(notif.link)
            onClose()
        }
    }
    return (
        <div
            className='absolute right-0 mt-2 w-80 rounded-xl shadow-xl z-50 overflow-hidden'

            style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)"
            }}
        >
            {/* Header */}
            <div
                className='flex items-center justify-between px-4 py-3'
                style={{ borderBottom: "1px solid var(--color-border)" }}

            >
                <span className='text-sm font-semibold' style={{ color: 'var(--color-text)' }}>
                    Notifications
                </span>
                {items.some((n) => !n.read) && (
                    <button
                        onClick={onMarkAllRead}
                        className='text-xs flex items-center gap-1 cursor-pointer'

                        style={{ color: "var(--color-accent)" }}
                    >

                        <CheckCheck size={13} />
                        Mark all read
                    </button>
                )}
            </div>
            {/* List */}
            <div className='max-h-80 overflow-y-auto'>
                {items.length === 0 ? (
                    <p
                        className='text-sm text-center py-8'
                        style={{ color: "var(--color-text-muted)" }}
                    >No notification yet</p>
                ) : (
                    items.map((notif) => (
                        <div
                            key={notif._id}
                            onClick={() => handleClick(notif)}
                            className='flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors'
                            style={{
                                background: notif.read ? "transparent" : "var(--color-surface)",
                                borderBottom: "1px solid var(--color-border)"
                            }}
                        >
                            {/* Unread dot */}
                            <span
                                className='mt-1.5 w-2 h-2 rounded-full shrink-0'
                                style={{
                                    background: notif.read ? "transparent" : "var(--color-accent)"
                                }}
                            >
                            </span>
                            <div className='flex-1 min-w-0'>
                                <p
                                    className='text-xs font-medium mb-0.5'
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    {Type_Labels[notif.type] || notif.type}
                                </p>
                                <p
                                    className='text-sm leading-snug'
                                    style={{ color: "var(--color-text)" }}
                                >
                                    {notif.message}
                                </p>
                                <p
                                    className='text-xs mt-1'
                                    style={{ color: "var(--color-text-muted)" }}
                                >
                                    {timeAgo(notif.createdAt)}
                                </p>


                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete(notif._id)

                                }}
                                className='shrink-0 p-1 rounded cursor-pointer transition-colors'
                                style={{ color: "var(--color-text-muted)" }}
                            >

                                <Trash2 size={13} />
                            </button>


                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default NotificationDropdown