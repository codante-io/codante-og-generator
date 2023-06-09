import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

function makeTitleFromSlug(slug) {
  const text = slug?.toLowerCase().replace(/-/g, ' ');
  text?.charAt(0).toUpperCase();
  return text?.charAt(0).toUpperCase() + text?.slice(1);
}

function toTitleCase(str) {
  return str.toLowerCase().replace(/(?:^|\s|-)\w/g, function (match) {
    return match.toUpperCase();
  });
}

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  let title = 'Codante.io';
  let subtitle = '';

  if (searchParams.getAll('name').length === 2) {
    subtitle = makeTitleFromSlug(searchParams.getAll('name')[0]) || '';
    title = makeTitleFromSlug(searchParams.getAll('name')[1]) || 'Codante.io';
  } else if (searchParams.getAll('name').length === 1) {
    title = makeTitleFromSlug(searchParams.get('name')) || 'Codante.io';

    // fix for titles with subtitle in production
    if (title.includes('/')) {
      const [newSubtitle, newTitle] = title.split('/');
      title = newTitle.trim();
      subtitle = newSubtitle.trim();

      title = toTitleCase(title);
      subtitle = toTitleCase(subtitle);
    }
  } else {
    title = 'Codante.io';
  }

  // add icons to subtitle
  subtitle = subtitle.toLowerCase().includes('projeto')
    ? `🛠️ ${subtitle}`
    : subtitle;
  subtitle = subtitle.toLowerCase().includes('workshop')
    ? `📚 ${subtitle}`
    : subtitle;
  subtitle = subtitle.toLowerCase().includes('trilha')
    ? `🚠 ${subtitle}`
    : subtitle;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundColor: 'white',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="250"
            height="148"
            viewBox="0 0 250 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M96.9855 74.1011C89.1854 74.1011 83.1728 71.8911 78.9477 67.471C74.7226 62.986 72.6101 56.4209 72.6101 47.7757C72.6101 39.2606 74.6576 32.7605 78.7527 28.2754C82.8478 23.7254 88.6003 21.4503 96.0105 21.4503C99.4555 21.4503 102.738 21.6778 105.858 22.1328C107.093 22.3278 108.101 22.9129 108.881 23.8879C109.726 24.8629 110.148 26.0004 110.148 27.3004C110.148 28.4054 109.693 29.2829 108.783 29.933C107.938 30.583 106.963 30.778 105.858 30.518C102.673 29.803 99.6505 29.4454 96.7905 29.4454C92.3054 29.4454 88.9254 30.908 86.6503 33.833C84.4403 36.7581 83.3353 41.4056 83.3353 47.7757C83.3353 54.2758 84.5053 58.9559 86.8453 61.8159C89.2504 64.676 92.8904 66.106 97.7655 66.106C100.821 66.106 103.746 65.6835 106.541 64.8385C107.581 64.5135 108.523 64.676 109.368 65.326C110.213 65.911 110.636 66.7235 110.636 67.7635C110.636 69.0636 110.213 70.2336 109.368 71.2736C108.523 72.3136 107.483 72.9636 106.248 73.2236C103.128 73.8086 100.041 74.1011 96.9855 74.1011Z"
              fill="#5282FF"
            />
            <path
              d="M144.19 29.2504C135.74 29.2504 131.515 35.4255 131.515 47.7757C131.515 54.0158 132.62 58.6634 134.83 61.7184C137.105 64.7735 140.225 66.301 144.19 66.301C147.635 66.301 150.592 65.1635 153.063 62.8885C155.598 60.6134 156.865 58.0134 156.865 55.0883V40.4631C156.865 37.5381 155.598 34.938 153.063 32.663C150.592 30.388 147.635 29.2504 144.19 29.2504ZM141.752 74.1011C135.837 74.1011 130.93 71.7286 127.03 66.9835C123.195 62.2384 121.277 55.8358 121.277 47.7757C121.277 39.4556 123.13 32.988 126.835 28.3729C130.605 23.7579 135.577 21.4503 141.752 21.4503C147.537 21.4503 152.478 23.5304 156.573 27.6904C156.638 27.7554 156.703 27.7879 156.768 27.7879C156.833 27.7879 156.865 27.7554 156.865 27.6904V5.07008C156.865 3.64006 157.353 2.43754 158.328 1.46253C159.368 0.487508 160.603 0 162.033 0C163.463 0 164.665 0.487508 165.64 1.46253C166.615 2.43754 167.103 3.64006 167.103 5.07008V68.3485C167.103 69.6486 166.615 70.7861 165.64 71.7611C164.73 72.6711 163.625 73.1261 162.325 73.1261C161.025 73.1261 159.888 72.6711 158.913 71.7611C158.003 70.7861 157.515 69.6486 157.45 68.3485L157.353 66.886C157.353 66.821 157.32 66.7885 157.255 66.7885C157.19 66.7885 157.125 66.821 157.06 66.886C154.655 69.5511 152.283 71.4361 149.942 72.5411C147.602 73.5811 144.872 74.1011 141.752 74.1011Z"
              fill="#5282FF"
            />
            <path
              d="M90.0681 145.448C89.0931 146.423 87.8906 146.911 86.4606 146.911C85.0306 146.911 83.7955 146.423 82.7555 145.448C81.7805 144.473 81.293 143.271 81.293 141.841V100.988C81.293 99.6878 81.748 98.5828 82.658 97.6728C83.633 96.6977 84.7706 96.2102 86.0706 96.2102C87.3706 96.2102 88.4756 96.6977 89.3856 97.6728C90.3606 98.5828 90.8806 99.6878 90.9456 100.988L91.0431 102.45C91.0431 102.515 91.0756 102.548 91.1406 102.548C91.2056 102.548 91.2706 102.515 91.3357 102.45C95.9507 97.6403 101.216 95.2352 107.131 95.2352C113.046 95.2352 117.369 96.9252 120.099 100.305C122.829 103.62 124.194 109.08 124.194 116.686V141.938C124.194 143.303 123.706 144.473 122.731 145.448C121.756 146.423 120.586 146.911 119.221 146.911C117.856 146.911 116.654 146.423 115.614 145.448C114.638 144.473 114.151 143.303 114.151 141.938V118.148C114.151 112.298 113.436 108.333 112.006 106.253C110.576 104.108 107.976 103.035 104.206 103.035C101.151 103.035 98.2583 104.4 95.5282 107.13C92.8632 109.795 91.5307 112.655 91.5307 115.711V141.841C91.5307 143.271 91.0431 144.473 90.0681 145.448Z"
              fill="#333333"
            />
            <path
              d="M137.314 105.96C136.209 105.96 135.267 105.57 134.487 104.79C133.772 104.01 133.414 103.1 133.414 102.06C133.414 101.02 133.772 100.11 134.487 99.3303C135.267 98.5503 136.209 98.1603 137.314 98.1603H142.775C143.36 98.1603 143.652 97.8678 143.652 97.2828V84.7051C143.652 83.275 144.14 82.0725 145.115 81.0975C146.09 80.1225 147.292 79.635 148.722 79.635C150.152 79.635 151.355 80.1225 152.33 81.0975C153.37 82.0725 153.89 83.275 153.89 84.7051V97.2828C153.89 97.8678 154.182 98.1603 154.767 98.1603H167.54C168.645 98.1603 169.555 98.5503 170.27 99.3303C171.05 100.11 171.44 101.02 171.44 102.06C171.44 103.1 171.05 104.01 170.27 104.79C169.555 105.57 168.645 105.96 167.54 105.96H154.767C154.182 105.96 153.89 106.253 153.89 106.838V129.361C153.89 133.781 154.41 136.673 155.45 138.038C156.49 139.403 158.57 140.086 161.69 140.086C163.185 140.086 164.615 139.988 165.98 139.793C167.02 139.663 167.93 139.891 168.71 140.476C169.555 141.061 169.977 141.841 169.977 142.816C169.977 143.986 169.587 145.026 168.807 145.936C168.027 146.846 167.052 147.366 165.882 147.496C163.152 147.756 161.105 147.886 159.74 147.886C153.76 147.886 149.567 146.618 147.162 144.083C144.822 141.548 143.652 136.966 143.652 130.336V106.838C143.652 106.253 143.36 105.96 142.775 105.96H137.314Z"
              fill="#333333"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.9866 45.3274L33.3281 53.4917L16.7871 74.4437L33.3281 95.3957L22.9866 103.56L0 74.4437L22.9866 45.3274Z"
              fill="#5282FF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M36.0201 62.1972L49.3384 45.3274L59.6799 53.4917L46.3616 70.3615C44.472 72.755 44.472 76.1324 46.3616 78.5259L59.6799 95.3957L49.3384 103.56L36.0201 86.6902C30.3514 79.5099 30.3514 69.3776 36.0201 62.1972Z"
              fill="#333333"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M227.013 45.3274L216.672 53.4917L233.213 74.4437L216.672 95.3957L227.013 103.56L250 74.4437L227.013 45.3274Z"
              fill="#5282FF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M213.98 62.1972L200.662 45.3274L190.32 53.4917L203.638 70.3615C205.528 72.755 205.528 76.1324 203.638 78.5259L190.32 95.3957L200.662 103.56L213.98 86.6902C219.649 79.5099 219.649 69.3776 213.98 62.1972Z"
              fill="#333333"
            />
          </svg>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            marginTop: '50px',
            marginBottom: '-30px',
            fontStyle: 'normal',
            color: '#5282FF',
            lineHeight: 1.2,
            whiteSpace: 'pre-wrap',
          }}
        >
          <b>{subtitle}</b>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 45,
            margin: '50px 200px',
            fontStyle: 'normal',
            color: 'black',
            lineHeight: 1.2,
            whiteSpace: 'pre-wrap',
          }}
        >
          <b>{title}</b>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
