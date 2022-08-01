import type { NextPage } from 'next';
import React, { useState } from 'react';
import tagPool from '../tag-pool.json';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '../components/Alert';

type typeTag = keyof typeof tagPool;

const tagKey = Object.keys(tagPool);

const LightTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.8)',
    boxShadow: '1px 4px 10px rgba(0,0,0,0.1)',
    fontSize: 11,
  },
}))(Tooltip);

const Home: NextPage = () => {
  const [tag, setTag] = useState<string[] | null>(null);
  const [tagCount, setTagCount] = useState<number>(20);
  const [category, setCategory] = useState<string>(tagKey[0]);
  const [isHideSpinner, setIsHideSpinner] = useState<boolean>(true);
  console.log(tagCount);

  const [openAlert, setOpenAlert] = useState<{
    open: boolean;
    message?: string;
    color?: string;
  }>({
    open: false,
    message: 'NON - Message',
    color: 'success',
  });

  const getTag = (tagName: typeTag, count?: number) => {
    const toothbrush = tagPool[tagName];

    let temp: string[] = [];

    count = typeof count === 'number' && count > 0 ? count : 20;

    if (toothbrush.length < count) {
      setOpenAlert({ open: true, message: `${tagName} 标签数量少于 ${count}` });
      temp = toothbrush;
      setTag(temp);
      return;
    }

    for (let i = 0; i < count; i++) {
      const word = toothbrush[Math.floor(Math.random() * toothbrush.length)];
      if (temp.indexOf(word) === -1) {
        temp.push(word);
      } else {
        let repect = count;
        while (repect > 0) {
          repect--;
          const word =
            toothbrush[Math.floor(Math.random() * toothbrush.length)];
          if (temp.indexOf(word) === -1) {
            temp.push(word);
            break;
          }
        }
      }
    }
    console.log('temp=', temp);
    setTag(temp);
  };

  const copyTag = async () => {
    if (tag && !!tag.length) {
      try {
        await navigator.clipboard.writeText(tag.join(' '));
        setOpenAlert({
          open: true,
          message: '标签复制成功!!',
          color: 'success',
        });
      } catch (error) {
        setOpenAlert({
          open: true,
          message: `不能自动复制，错误信息：${(error as Error).message}`,
        });
      }
    } else {
      setOpenAlert({
        open: true,
        message: `没有内容可复制`,
      });
    }
  };

  const selectHandle = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setCategory(e.target.value as string);
  };

  const handleTagCount = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const numReg = /^\+?[0-9]{1,2}$/;
    const count = e.target.value;
    if (numReg.test(count)) {
      setTagCount(parseInt(count, 10));
    } else {
      if (count === '' || count === undefined) {
        setTagCount(20);
      }
    }
  };

  return (
    <div className="p-4 tracking-wider flex items-center text-slate-900/90 justify-center h-screen flex-col bg-gradient-to-tr from-cyan-500/25 to-sky-500/50 font-system">
      <h1 className="text-center text-6xl font-semibold ">随机标签池🧊</h1>

      <div className="mt-8 text-slate-900/60 text-center">
        随机抽取标签池的标签，默认自动选择20个标签抽取，请先过滤需要的类目。
      </div>
      <button
        className=" tracking-widest mt-4 py-3 px-14 bg-sky-500/75 hover:bg-sky-500/100 cursor-pointer rounded-full focus:ring-4 text-white font-semibold text-lg transition"
        onClick={() => getTag(category as typeTag, tagCount)}
      >
        抽取随机词
      </button>

      {tag && !!tag.length ? (
        <LightTooltip
          title="请点击复制标签"
          enterDelay={500}
          leaveDelay={200}
          placement={'bottom-start'}
        >
          <div
            className="whitespace-normal text-ellipsis line-clamp-4 mt-8 text-xs text-zinc-500/70 p-1 px-4 rounded-xl shadow-2xl border cursor-pointer hover:bg-green-50 bg-slate-50 border-green-300 transition duration-500 max-w-sm"
            style={{ height: '72px' }}
            onClick={copyTag}
          >
            {tag.join(' ')}
          </div>
        </LightTooltip>
      ) : (
        <div className="mt-8 font-bold" style={{ height: '72px' }}>
          暂无标签 (^///^)
        </div>
      )}

      <div
        className="text-sm text-stone-600/80 mt-10 cursor-pointer "
        onClick={() => {
          setIsHideSpinner(!isHideSpinner);
        }}
      >
        {isHideSpinner ? '展开选项' : '隐藏选项'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 inline-block ml-2 ${
            isHideSpinner ? 'rotate-0' : 'rotate-180'
          } transition`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className={`mt-4 w-80 flex gap-4 flex-col ${
          isHideSpinner ? 'opacity-0 invisible' : 'opacity-100 visible'
        } transition-all`}
      >
        <FormControl variant="filled" fullWidth size="small">
          <InputLabel id="category-label">类目</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            onChange={(e) => selectHandle(e)}
          >
            {tagKey.map((v, i) => {
              return (
                <MenuItem value={v} key={`${i}u`}>
                  {v}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>默认选择第一个</FormHelperText>
        </FormControl>

        <TextField
          fullWidth
          label="标签数量"
          variant="filled"
          defaultValue={tagCount}
          onChange={(e) => handleTagCount(e)}
          helperText="默认筛选20个标签，数量: 1-99"
        />
      </div>
      <Alert
        message={openAlert.message}
        open={openAlert.open}
        onClose={() => {
          setOpenAlert({ open: false });
        }}
      />
    </div>
  );
};

export default Home;
