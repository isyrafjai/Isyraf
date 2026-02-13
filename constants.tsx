
import React from 'react';
import { Question } from './types';

export const STRATEGIC_QUESTIONS: Question[] = [
  {
    id: 'a1',
    text: "How critical is direct 1st-party consumer data to your brand's future growth?",
    explanation: "Evaluates if you rely on retail partners or seek direct relationships with end-users for revenue growth.",
    labels: ["Low Priority", "Moderate", "Critical Focus"],
    feedbacks: ["Data isn't a core focus currently.", "Important, but secondary to sales.", "Data drives our entire business strategy."]
  },
  {
    id: 'a2',
    text: "Is packaging viewed by leadership as a digital asset or just a physical cost?",
    explanation: "Is packaging leveraged as a digital touchpoint for marketing and data collection?",
    labels: ["Sunk Cost", "Informational", "Digital Asset"],
    feedbacks: ["Packaging is just a protective shell.", "We use it for basic info.", "Packaging is a critical digital touchpoint."]
  },
  {
    id: 'a3',
    text: "How urgently do you need to address grey market diversion or counterfeiting?",
    explanation: "Assessment of brand protection risks and revenue loss from unauthorized sales.",
    labels: ["Not Concerned", "Monitoring", "High Urgency"],
    feedbacks: ["Not a major issue currently.", "We are monitoring instances.", "Impacts revenue/brand significantly."]
  },
  {
    id: 'a4',
    text: "Is automated ESG and Compliance tracking a strategic priority?",
    explanation: "Evaluates the need for real-time origin, material, and lifecycle tracking.",
    labels: ["Not Priority", "Exploring", "Top Priority"],
    feedbacks: ["Handled manually or reactively.", "Looking into digitization.", "Top strategic priority."]
  }
];

export const OPERATIONAL_QUESTIONS: Question[] = [
  { id: 'p1', text: "Do you know who buys your product?", explanation: "Evaluates ownership of direct 1st-party consumer data.", labels: ["Retailer Data", "Anonymous", "Direct 1st Party"], feedbacks: ["Blind (Retailer owns data)", "Hazy (Web traffic only)", "Visible (Direct insights)"] },
  { id: 'p2', text: "Can you instantly spot diverted stock?", explanation: "Visibility into Grey Market activities.", labels: ["No Visibility", "Manual Check", "Real-Time Alerts"], feedbacks: ["Unknown visibility", "Reactive checks", "Controlled alerts"] },
  { id: 'p3', text: "Is your security easy to replicate?", explanation: "Barrier to entry for counterfeiters.", labels: ["Simple Print", "Hologram", "Digital Layer"], feedbacks: ["High Risk (Print/Sticker)", "Moderate (Hologram)", "Secure (Digital layer)"] },
  { id: 'p4', text: "Can you recall specific bad units?", explanation: "Precision of recall capabilities.", labels: ["Full Batch", "Lot Level", "Unit Level"], feedbacks: ["Wasteful (Full batch)", "Segmented (Lot level)", "Surgical (Unit isolation)"] },
  { id: 'p5', text: "Is your packaging a sunk cost?", explanation: "Turning static labels into active assets.", labels: ["Static Label", "Info Link", "Active Asset"], feedbacks: ["Sunk Cost", "Informational", "Loyalty Generator"] },
  { id: 'p6', text: "Are audits manual and painful?", explanation: "Efficiency of compliance and reporting.", labels: ["Manual", "Digital Docs", "Automated"], feedbacks: ["Manual (High risk)", "Batch reports", "Automated (Passports)"] },
  { id: 'p7', text: "Is your green impact measurable?", explanation: "Ability to prove sustainability claims.", labels: ["Unmeasured", "Estimates", "Unit Proven"], feedbacks: ["Greenwashing risk", "Estimated averages", "Unit-level tracking"] },
  { id: 'p8', text: "Can you reroute stock instantly?", explanation: "Supply chain agility and visibility.", labels: ["Frozen", "Delayed", "Agile"], feedbacks: ["Slow (Frozen)", "Delayed reviews", "Agile rerouting"] }
];

export const CAPABILITY_QUESTIONS: Question[] = [
  { id: 's1', text: "Do you capture direct consumer emails?", explanation: "Capability to harvest contact info via packaging.", labels: ["None", "Passive Web", "CRM Sync"], feedbacks: ["No data flow", "Passive traffic", "Active CRM integration"] },
  { id: 's2', text: "How granular is your location tracking?", explanation: "Depth of visibility across the chain.", labels: ["Warehouse", "Milestone", "Real-Time Unit"], feedbacks: ["Warehouse only", "Milestone scanning", "Real-time unit tracking"] },
  { id: 's3', text: "How strong is your authentication?", explanation: "Technology verifying product authenticity.", labels: ["Weak/None", "Basic QR", "Encrypted"], feedbacks: ["No digital layer", "Basic QR", "Robust encrypted layer"] },
  { id: 's4', text: "Is each unit uniquely identified?", explanation: "Level of serialization maturity.", labels: ["Batch/SKU", "Case Level", "Unique Item ID"], feedbacks: ["Batch/SKU only", "Case/Pallet ID", "Unique ID per unit"] },
  { id: 's5', text: "Does your engagement drive loyalty?", explanation: "Effectiveness of post-purchase interaction.", labels: ["No Incentive", "Generic Info", "Rewards"], feedbacks: ["No incentives", "Standard info", "Personalized rewards"] },
  { id: 's6', text: "Is your compliance automated?", explanation: "Digital Product Passport readiness.", labels: ["Paper", "Digital PDF", "Smart Data"], feedbacks: ["Paper-based", "Digital archives", "Smart data exchange"] },
  { id: 's7', text: "Do you have material lifecycle data?", explanation: "Circular economy readiness and tracing.", labels: ["Estimates", "Batch Certs", "Circular Trace"], feedbacks: ["Estimates only", "Batch certificates", "End-to-end circular trace"] },
  { id: 's8', text: "Are you making real-time decisions?", explanation: "Data latency and decision intelligence.", labels: ["Old Reports", "Dashboard", "Predictive AI"], feedbacks: ["Lagged reports", "Live dashboards", "Predictive AI-driven"] }
];

export const Icons = {
  /** 
   * Official Trustori Full Logo (Symbol + Wordmark)
   * Exact SVG provided in brand guidelines
   */
  FullLogo: ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.822 28.012" className={className} fill="currentColor">
      <g>
        {/* Symbol Paths */}
        <path d="M 9.666 15.897 L 7.95 14.895 C 7.755 14.766 7.496 14.766 7.302 14.895 L 1.311 18.386 L 0.34 18.935 C -0.113 19.194 -0.113 19.841 0.34 20.099 L 1.311 20.649 L 1.441 20.713 L 2.736 21.457 C 3.157 21.715 3.708 21.715 4.129 21.457 L 9.666 18.257 C 9.828 18.16 9.925 17.966 9.925 17.772 L 9.925 16.382 C 9.925 16.188 9.828 15.994 9.633 15.897 Z" />
        <path d="M 14.685 18.806 L 12.936 17.804 L 11.673 17.093 L 11.479 16.996 C 11.188 16.834 10.799 17.028 10.799 17.384 L 10.799 25.335 C 10.799 25.82 11.058 26.305 11.479 26.531 L 12.871 27.339 L 13.875 27.921 C 14.329 28.18 14.879 27.857 14.879 27.339 L 14.879 19.226 C 14.879 19.065 14.782 18.935 14.652 18.838 Z M 11.155 15.089 C 12.256 14.443 13.357 13.828 14.458 13.182 L 14.75 13.02 C 14.814 12.988 14.879 12.891 14.879 12.826 L 14.879 2.645 C 14.879 2.16 14.62 1.675 14.167 1.449 L 12.807 0.673 L 11.77 0.091 C 11.317 -0.168 10.767 0.156 10.767 0.673 L 10.767 10.079 C 10.767 10.273 10.572 10.37 10.41 10.273 L 9.86 9.95 L 3.254 6.135 L 2.25 5.554 C 1.797 5.295 1.247 5.618 1.247 6.135 L 1.247 9.045 C 1.247 9.465 1.473 9.853 1.83 10.079 L 8.727 14.055 L 9.86 14.701 C 10.087 14.83 10.313 14.96 10.572 15.089 C 10.605 15.089 10.702 15.154 10.799 15.154 C 10.961 15.154 11.09 15.089 11.123 15.057 Z" />
        <path d="M 25.5 7.978 L 24.496 7.396 L 24.27 7.267 L 24.205 7.267 C 24.205 7.234 23.104 6.588 23.104 6.588 C 22.683 6.329 22.132 6.329 21.711 6.588 L 15.98 9.885 C 15.85 9.95 15.786 10.079 15.786 10.241 L 15.786 11.663 C 15.786 11.921 15.915 12.148 16.142 12.277 L 17.729 13.214 C 17.923 13.311 18.15 13.311 18.344 13.214 L 19.218 12.697 L 24.172 9.853 L 24.237 9.853 C 24.237 9.82 25.468 9.109 25.468 9.109 C 25.921 8.851 25.921 8.204 25.468 7.946 Z" />
        <path d="M 23.784 17.966 L 18.247 14.766 L 17.696 14.443 L 16.984 14.022 C 16.79 13.925 16.628 13.828 16.433 13.699 C 16.336 13.634 16.239 13.57 16.142 13.537 C 16.142 13.537 16.045 13.473 15.98 13.473 C 15.915 13.473 15.85 13.505 15.818 13.537 L 12.127 15.671 C 12.062 15.671 12.03 15.768 12.062 15.832 C 12.062 15.929 12.127 15.962 12.159 15.962 C 12.418 16.091 12.645 16.253 12.904 16.382 L 14.167 17.093 L 14.944 17.546 L 15.85 18.063 L 22.424 21.845 L 23.492 22.459 C 24.01 22.75 24.626 22.394 24.626 21.812 L 24.626 19.323 C 24.626 18.742 24.334 18.224 23.816 17.933 Z" />
        {/* Wordmark Paths */}
        <path d="M 55.355 8.818 C 54.481 8.818 53.736 9.045 53.089 9.529 C 52.441 10.014 51.988 10.693 51.729 11.598 L 51.599 11.598 L 51.599 8.98 L 47.649 8.98 L 47.649 24.043 L 51.729 24.043 L 51.729 15.574 C 51.729 14.927 51.858 14.346 52.15 13.861 C 52.409 13.376 52.797 13.02 53.283 12.729 C 53.769 12.471 54.319 12.342 54.902 12.342 C 55.485 12.342 55.55 12.342 55.906 12.374 C 56.262 12.374 56.489 12.438 56.683 12.503 L 56.683 8.915 C 56.521 8.883 56.294 8.851 56.068 8.818 L 55.388 8.818 Z M 68.599 17.61 C 68.599 18.289 68.47 18.871 68.21 19.356 C 67.951 19.841 67.628 20.196 67.174 20.455 C 66.721 20.713 66.235 20.81 65.652 20.81 C 64.81 20.81 64.13 20.552 63.645 20.034 C 63.159 19.517 62.932 18.774 62.932 17.804 L 62.932 8.98 L 58.852 8.98 L 58.852 18.515 C 58.852 19.711 59.079 20.746 59.5 21.586 C 59.921 22.459 60.536 23.105 61.313 23.558 C 62.09 24.01 62.997 24.236 64.066 24.236 C 65.134 24.236 66.397 23.881 67.239 23.202 C 67.887 22.653 68.372 21.974 68.761 21.101 L 68.761 24.043 L 72.679 24.043 L 72.679 8.98 L 68.599 8.98 Z M 84.433 15.315 L 81.713 14.766 C 81.033 14.636 80.548 14.443 80.224 14.184 C 79.932 13.925 79.77 13.602 79.77 13.214 C 79.77 12.826 79.997 12.374 80.418 12.115 C 80.871 11.824 81.422 11.695 82.102 11.695 C 82.782 11.695 83.43 11.857 83.883 12.212 C 84.304 12.568 84.595 12.988 84.725 13.537 L 88.384 13.02 C 88.254 12.148 87.898 11.404 87.348 10.758 C 86.797 10.111 86.085 9.626 85.21 9.271 C 84.304 8.915 83.268 8.754 82.037 8.754 C 80.807 8.754 79.641 8.948 78.702 9.335 C 77.763 9.723 77.018 10.241 76.5 10.952 C 75.982 11.663 75.723 12.471 75.723 13.441 C 75.723 14.41 76.079 15.509 76.824 16.22 C 77.536 16.931 78.637 17.449 80.094 17.739 L 82.685 18.257 C 83.332 18.386 83.818 18.58 84.142 18.838 C 84.466 19.097 84.628 19.42 84.628 19.808 C 84.628 20.196 84.401 20.649 83.948 20.939 C 83.494 21.23 82.879 21.392 82.102 21.392 C 81.325 21.392 80.645 21.23 80.127 20.875 C 79.641 20.519 79.285 20.002 79.123 19.291 L 75.302 19.808 C 75.464 20.778 75.82 21.586 76.435 22.265 C 77.018 22.944 77.795 23.461 78.767 23.816 C 79.706 24.172 80.807 24.366 82.037 24.366 C 83.268 24.366 84.53 24.172 85.534 23.752 C 86.538 23.331 87.348 22.75 87.93 22.006 C 88.513 21.263 88.772 20.39 88.772 19.42 C 88.772 18.451 88.416 17.449 87.704 16.802 C 86.991 16.123 85.89 15.638 84.433 15.348 Z M 39.877 3.259 L 35.797 3.259 L 35.797 8.98 L 33.595 8.98 L 33.595 12.115 L 35.797 12.115 L 35.797 20.002 C 35.797 21.36 36.186 22.426 36.995 23.137 C 37.675 23.752 38.647 24.107 39.877 24.172 L 39.877 12.115 L 45.382 12.115 L 45.382 8.98 L 39.877 8.98 Z M 89.841 12.245 L 92.852 12.245 L 92.852 24.172 L 97.03 24.172 L 97.03 12.245 L 100.041 12.245 L 100.041 8.948 L 89.841 8.948 Z M 113.609 9.626 C 112.41 8.98 110.986 8.657 109.334 8.657 C 107.683 8.657 106.226 8.98 105.028 9.626 C 103.797 10.273 102.858 11.178 102.21 12.374 C 101.563 13.537 101.207 14.96 101.207 16.544 C 101.207 18.127 101.53 19.55 102.21 20.746 C 102.89 21.909 103.83 22.847 105.028 23.493 C 106.258 24.139 107.65 24.463 109.302 24.463 C 110.953 24.463 112.378 24.139 113.576 23.493 C 114.807 22.847 115.713 21.942 116.393 20.746 C 117.041 19.55 117.365 18.16 117.365 16.544 C 117.365 14.927 117.041 13.505 116.393 12.342 C 115.746 11.146 114.807 10.241 113.609 9.594 Z M 112.216 19.647 C 111.536 20.422 110.565 20.81 109.334 20.81 C 108.104 20.81 107.1 20.422 106.42 19.647 C 105.74 18.871 105.416 17.836 105.416 16.511 C 105.416 15.186 105.74 14.152 106.42 13.408 C 107.1 12.665 108.071 12.277 109.334 12.277 C 110.597 12.277 111.569 12.665 112.216 13.408 C 112.896 14.152 113.22 15.186 113.22 16.511 C 113.22 17.836 112.896 18.871 112.216 19.647 Z M 125.687 9.562 C 124.812 10.079 124.165 10.887 123.776 11.954 L 122.74 11.954 L 122.74 8.98 L 118.53 8.98 L 118.53 13.15 L 120.603 13.15 L 120.603 24.204 L 124.715 24.204 L 124.715 16.544 C 124.715 15.315 125.007 14.346 125.622 13.602 C 126.237 12.859 127.209 12.503 128.504 12.503 L 129.961 12.503 L 129.961 8.851 L 128.666 8.851 C 127.565 8.851 126.593 9.109 125.719 9.626 Z M 131.645 8.948 L 135.822 8.948 L 135.822 24.139 L 131.645 24.139 Z" />
        {/* Special Character Details (Dots) */}
        <path d="M 92.982 3.259 L 97.062 3.259 L 97.062 7.331 L 92.982 7.331 Z" />
        <path d="M 41.302 20.713 L 41.302 24.204 L 45.382 24.204 L 45.382 20.099 L 41.302 20.099 Z M 131.71 3.259 L 135.79 3.259 L 135.79 7.331 L 131.71 7.331 Z" />
      </g>
    </svg>
  ),
  /** Official Trustori Symbol Only (Asterisk/Luban Lock) */
  Asterisk: ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.5 28.012" className={className} fill="currentColor">
       <path d="M 9.666 15.897 L 7.95 14.895 C 7.755 14.766 7.496 14.766 7.302 14.895 L 1.311 18.386 L 0.34 18.935 C -0.113 19.194 -0.113 19.841 0.34 20.099 L 1.311 20.649 L 1.441 20.713 L 2.736 21.457 C 3.157 21.715 3.708 21.715 4.129 21.457 L 9.666 18.257 C 9.828 18.16 9.925 17.966 9.925 17.772 L 9.925 16.382 C 9.925 16.188 9.828 15.994 9.633 15.897 Z" />
       <path d="M 14.685 18.806 L 12.936 17.804 L 11.673 17.093 L 11.479 16.996 C 11.188 16.834 10.799 17.028 10.799 17.384 L 10.799 25.335 C 10.799 25.82 11.058 26.305 11.479 26.531 L 12.871 27.339 L 13.875 27.921 C 14.329 28.18 14.879 27.857 14.879 27.339 L 14.879 19.226 C 14.879 19.065 14.782 18.935 14.652 18.838 Z M 11.155 15.089 C 12.256 14.443 13.357 13.828 14.458 13.182 L 14.75 13.02 C 14.814 12.988 14.879 12.891 14.879 12.826 L 14.879 2.645 C 14.879 2.16 14.62 1.675 14.167 1.449 L 12.807 0.673 L 11.77 0.091 C 11.317 -0.168 10.767 0.156 10.767 0.673 L 10.767 10.079 C 10.767 10.273 10.572 10.37 10.41 10.273 L 9.86 9.95 L 3.254 6.135 L 2.25 5.554 C 1.797 5.295 1.247 5.618 1.247 6.135 L 1.247 9.045 C 1.247 9.465 1.473 9.853 1.83 10.079 L 8.727 14.055 L 9.86 14.701 C 10.087 14.83 10.313 14.96 10.572 15.089 C 10.605 15.089 10.702 15.154 10.799 15.154 C 10.961 15.154 11.09 15.089 11.123 15.057 Z" />
       <path d="M 25.5 7.978 L 24.496 7.396 L 24.27 7.267 L 24.205 7.267 C 24.205 7.234 23.104 6.588 23.104 6.588 C 22.683 6.329 22.132 6.329 21.711 6.588 L 15.98 9.885 C 15.85 9.95 15.786 10.079 15.786 10.241 L 15.786 11.663 C 15.786 11.921 15.915 12.148 16.142 12.277 L 17.729 13.214 C 17.923 13.311 18.15 13.311 18.344 13.214 L 19.218 12.697 L 24.172 9.853 L 24.237 9.853 C 24.237 9.82 25.468 9.109 25.468 9.109 C 25.921 8.851 25.921 8.204 25.468 7.946 Z" />
       <path d="M 23.784 17.966 L 18.247 14.766 L 17.696 14.443 L 16.984 14.022 C 16.79 13.925 16.628 13.828 16.433 13.699 C 16.336 13.634 16.239 13.57 16.142 13.537 C 16.142 13.537 16.045 13.473 15.98 13.473 C 15.915 13.473 15.85 13.505 15.818 13.537 L 12.127 15.671 C 12.062 15.671 12.03 15.768 12.062 15.832 C 12.062 15.929 12.127 15.962 12.159 15.962 C 12.418 16.091 12.645 16.253 12.904 16.382 L 14.167 17.093 L 14.944 17.546 L 15.85 18.063 L 22.424 21.845 L 23.492 22.459 C 24.01 22.75 24.626 22.394 24.626 21.812 L 24.626 19.323 C 24.626 18.742 24.334 18.224 23.816 17.933 Z" />
    </svg>
  ),
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  ArrowLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Info: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  Print: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/><rect x="6" y="14" width="12" height="8" rx="2"/></svg>,
  Chart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Sparkles: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
};
